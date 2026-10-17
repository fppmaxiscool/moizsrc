/**
 * DOCWRIGHT 5 TB CENTRAL CLOUD BACKEND
 * Multi-user Authentication & Per-user Google Drive Storage
 */

const ROOT_FOLDER_NAME = "Docwright Central Cloud (5 TB)";
const USERS_FOLDER_NAME = "Users";
const USERS_DB_FILE = "_users_registry.json";

function getRootFolder() {
  const folders = DriveApp.getFoldersByName(ROOT_FOLDER_NAME);
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(ROOT_FOLDER_NAME);
}

function getUsersFolder() {
  const root = getRootFolder();
  const folders = root.getFoldersByName(USERS_FOLDER_NAME);
  return folders.hasNext() ? folders.next() : root.createFolder(USERS_FOLDER_NAME);
}

function getUserFolder(userId) {
  const usersFolder = getUsersFolder();
  const folders = usersFolder.getFoldersByName(userId);
  return folders.hasNext() ? folders.next() : usersFolder.createFolder(userId);
}

function loadUsersRegistry() {
  const root = getRootFolder();
  const files = root.getFilesByName(USERS_DB_FILE);
  if (files.hasNext()) {
    try {
      return JSON.parse(files.next().getBlob().getDataAsString());
    } catch (e) {
      return {};
    }
  }
  return {};
}

function saveUsersRegistry(registry) {
  const root = getRootFolder();
  const files = root.getFilesByName(USERS_DB_FILE);
  const jsonStr = JSON.stringify(registry, null, 2);
  if (files.hasNext()) {
    files.next().setContent(jsonStr);
  } else {
    root.createFile(USERS_DB_FILE, jsonStr, MimeType.PLAIN_TEXT);
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const action = e && e.parameter && e.parameter.action;
  if (action === "stats") {
    const registry = loadUsersRegistry();
    return jsonResponse({
      status: "online",
      storage: "5 TB Central Drive",
      userCount: Object.keys(registry).length
    });
  }
  return jsonResponse({
    status: "online",
    storage: "5 TB Central Drive"
  });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ status: "error", message: "No post data received" });
    }

    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    // 1. REGISTER NEW USER
    if (action === "register") {
      const username = (data.username || "").trim().toLowerCase();
      const passwordHash = data.passwordHash;
      const displayName = (data.displayName || data.username || "").trim();

      if (!username || username.length < 3) {
        return jsonResponse({ status: "error", message: "Username must be at least 3 characters" });
      }
      if (!passwordHash) {
        return jsonResponse({ status: "error", message: "Password is required" });
      }

      const registry = loadUsersRegistry();
      if (registry[username]) {
        return jsonResponse({ status: "error", message: "Username is already taken" });
      }

      const userId = "u_" + Utilities.getUuid().slice(0, 12);
      const userFolder = getUserFolder(userId);

      const userRecord = {
        userId: userId,
        username: username,
        displayName: displayName || username,
        passwordHash: passwordHash,
        folderId: userFolder.getId(),
        createdAt: new Date().toISOString()
      };

      registry[username] = userRecord;
      saveUsersRegistry(registry);

      return jsonResponse({
        status: "success",
        user: {
          userId: userRecord.userId,
          username: userRecord.username,
          displayName: userRecord.displayName,
          avatar: null
        },
        docs: {}
      });
    }

    // 2. LOGIN USER (USERNAME & PASSWORD)
    if (action === "login") {
      const username = (data.username || "").trim().toLowerCase();
      const passwordHash = data.passwordHash;

      const registry = loadUsersRegistry();
      const userRecord = registry[username];

      if (!userRecord || userRecord.passwordHash !== passwordHash) {
        return jsonResponse({ status: "error", message: "Incorrect username or password" });
      }

      const docs = loadUserDocuments(userRecord.userId);

      return jsonResponse({
        status: "success",
        user: {
          userId: userRecord.userId,
          username: userRecord.username,
          displayName: userRecord.displayName,
          avatar: userRecord.avatar || null
        },
        docs: docs
      });
    }

    // 3. GOOGLE SIGN-IN / AUTH
    if (action === "google_auth") {
      const googleId = data.googleId || data.sub;
      const email = (data.email || "").trim().toLowerCase();
      const name = data.name || email.split("@")[0] || "Docwright User";
      const picture = data.picture || null;

      if (!googleId && !email) {
        return jsonResponse({ status: "error", message: "Invalid Google credentials" });
      }

      const key = "g_" + (googleId || email.replace(/[^a-z0-9]/g, "_"));
      const registry = loadUsersRegistry();
      let userRecord = registry[key];

      if (!userRecord) {
        const userId = "u_" + Utilities.getUuid().slice(0, 12);
        const userFolder = getUserFolder(userId);
        userRecord = {
          userId: userId,
          username: email || key,
          displayName: name,
          email: email,
          avatar: picture,
          folderId: userFolder.getId(),
          authProvider: "google",
          createdAt: new Date().toISOString()
        };
        registry[key] = userRecord;
        saveUsersRegistry(registry);
      } else {
        // Update avatar and name if changed
        if (picture && userRecord.avatar !== picture) userRecord.avatar = picture;
        if (name && userRecord.displayName !== name) userRecord.displayName = name;
        saveUsersRegistry(registry);
      }

      const docs = loadUserDocuments(userRecord.userId);

      return jsonResponse({
        status: "success",
        user: {
          userId: userRecord.userId,
          username: userRecord.username,
          displayName: userRecord.displayName,
          avatar: userRecord.avatar
        },
        docs: docs
      });
    }

    // 4. SYNC / SAVE USER DOCUMENT
    if (action === "sync_doc") {
      const userId = data.userId;
      const doc = data.doc;

      if (!userId || !doc || !doc.id) {
        return jsonResponse({ status: "error", message: "Invalid document sync payload" });
      }

      const userFolder = getUserFolder(userId);
      const fileName = "doc_" + doc.id + ".json";
      const files = userFolder.getFilesByName(fileName);
      let file;
      const jsonContent = JSON.stringify(doc, null, 2);

      if (files.hasNext()) {
        file = files.next();
        file.setContent(jsonContent);
      } else {
        file = userFolder.createFile(fileName, jsonContent, MimeType.PLAIN_TEXT);
      }

      return jsonResponse({
        status: "success",
        fileId: file.getId(),
        url: file.getUrl(),
        docId: doc.id,
        savedAt: Date.now()
      });
    }

    // 5. LOAD ALL DOCUMENTS FOR USER
    if (action === "load_docs") {
      const userId = data.userId;
      if (!userId) {
        return jsonResponse({ status: "error", message: "User ID required" });
      }
      const docs = loadUserDocuments(userId);
      return jsonResponse({ status: "success", docs: docs });
    }

    // 6. DELETE USER DOCUMENT
    if (action === "delete_doc") {
      const userId = data.userId;
      const docId = data.docId;
      if (!userId || !docId) {
        return jsonResponse({ status: "error", message: "User ID and Doc ID required" });
      }
      const userFolder = getUserFolder(userId);
      const files = userFolder.getFilesByName("doc_" + docId + ".json");
      while (files.hasNext()) {
        files.next().setTrashed(true);
      }
      return jsonResponse({ status: "success", deletedDocId: docId });
    }

    // LEGACY FALLBACK: Direct document post without action
    const folder = getRootFolder();
    const fileName = (data.title || "Untitled") + "_" + (data.id || Date.now()) + ".json";
    const files = folder.getFilesByName(fileName);
    let file;
    if (files.hasNext()) {
      file = files.next();
      file.setContent(JSON.stringify(data, null, 2));
    } else {
      file = folder.createFile(fileName, JSON.stringify(data, null, 2), MimeType.PLAIN_TEXT);
    }
    return jsonResponse({
      status: "success",
      fileId: file.getId(),
      url: file.getUrl()
    });

  } catch (err) {
    return jsonResponse({
      status: "error",
      message: err.toString()
    });
  }
}

function loadUserDocuments(userId) {
  const userFolder = getUserFolder(userId);
  const files = userFolder.getFiles();
  const docs = {};
  while (files.hasNext()) {
    const file = files.next();
    if (file.isTrashed()) continue;
    const name = file.getName();
    if (name.startsWith("doc_") && name.endsWith(".json")) {
      try {
        const content = JSON.parse(file.getBlob().getDataAsString());
        if (content && content.id) {
          content.gdriveFileId = file.getId();
          content.centralDriveUrl = file.getUrl();
          content.centralDriveSyncedAt = content.updated || Date.now();
          docs[content.id] = content;
        }
      } catch (e) {
        // Skip corrupted file
      }
    }
  }
  return docs;
}

# Doxle - Collaborative Real-Time Document Editor  

Inspired by Google Docs, **Doxle** is a real-time, cloud-based document editor that enables **live collaboration, offline storage, and seamless synchronization** using **Firebase, WebSockets, IndexedDB, and Quill.js**.  

## 🚀 Features  

✅ **Real-time Collaboration** – Multiple users can edit the document simultaneously.  
✅ **WebSocket-based Synchronization** – Uses `y-websocket` for low-latency updates.  
✅ **Offline Persistence** – Stores data locally using `y-indexeddb` for offline editing.  
✅ **User Presence & Awareness** – Displays active users and their cursors in real time.  
✅ **Secure Authentication** – Uses Firebase for anonymous sign-in.  
✅ **Modern UI** – Built with Quill.js for a rich-text editing experience.  

## 🛠 Tech Stack  

- **Frontend:** React, Quill.js  
- **Backend:** WebSockets (y-websocket)  
- **Database & Persistence:** IndexedDB  
- **Authentication:** Firebase Authentication  
- **Deployment:** Firebase Hosting  

## 📦 Installation & Setup  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/yourusername/doxle.git
cd doxle
```

### 2️⃣ Install Dependencies  
```sh
npm install
```

### 3️⃣ Configure Firebase  
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).  
2. Enable **Firestore**, **Authentication**, and **Hosting**.  
3. Add your Firebase config in `firebase-config.js`.  

### 4️⃣ Run the Project  
```sh
npm run dev
```
The app will be available at **`http://localhost:5173`** (or the port Vite uses).  

## 🚀 Deploying to Firebase  

To deploy the project:  
```sh
firebase deploy
```




## 🤝 Contributing  

Contributions are welcome! Feel free to fork the repo, create a new branch, and submit a pull request.  

---

🚀 **Doxle** – Making real-time collaboration simple and seamless.


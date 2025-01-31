import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import "../Styles/styles.css";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", college: "", email: "", interest: "" });
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users from Firebase Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    };
    fetchUsers();
  }, []);

  // Handle input change for adding/editing user
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));
  };

  // Add or update user in Firebase
  const handleAddOrUpdateUser = async (e) => {
    e.preventDefault();
    try {
      // Trim values before adding or updating
      const { name, college, email, interest } = newUser;

      if (editingUser) {
        await updateDoc(doc(db, "users", editingUser.id), {
          name: name.trim(),
          college: college.trim(),
          email: email.trim(),
          interest: interest.trim(),
          updatedAt: new Date().toISOString(),
        });
        setUsers(users.map(user => (user.id === editingUser.id ? { ...user, ...newUser } : user)));
      } else {
        const docRef = await addDoc(collection(db, "users"), {
          name: name.trim(),
          college: college.trim(),
          email: email.trim(),
          interest: interest.trim(),
          createdAt: new Date().toISOString(),
        });
        setUsers([...users, { ...newUser, id: docRef.id }]);
      }
      setNewUser({ name: "", college: "", email: "", interest: "" });
      setEditingUser(null);
    } catch (error) {
      console.error("Error managing user:", error);
    }
  };

  // Set user to be edited
  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ ...user });
  };

  // Delete user from Firebase
  const handleDeleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button>Manage Users</button>
        <button onClick={() => navigate("")}>Back to Dashboard</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h2>{editingUser ? "Edit User" : "Add User"}</h2>
        <form className="user-form" onSubmit={handleAddOrUpdateUser}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newUser.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="college"
            placeholder="College"
            value={newUser.college}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="interest"
            placeholder="Interest"
            value={newUser.interest}
            onChange={handleInputChange}
            required
          />
          <button type="submit">{editingUser ? "Update User" : "Add User"}</button>
        </form>

        <h3>User List</h3>
        <ul className="user-list">
          {users.map((user) => (
            <li className="user-item" key={user.id}>
              <div className="user-info">
                {user.name} - {user.college} - {user.email} - {user.interest}
              </div>
              <div className="button-container">
                <button className="edit" onClick={() => handleEditUser(user)}>Edit</button>
                <button className="delete" onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../axiosInstance";
import { toast } from "sonner";
import assetLogo from "../assets/avatar.svg"; 

const Profile = () => {
  const { user, fetchUser } = useContext(AuthContext);
  
  // States for Password and UI
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassFields, setShowPassFields] = useState(false);

  // States for Editing Profile
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Sync local input state when user data is available
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!name || !email) return toast.error("Name and Email are required");
    
    try {
      await axiosInstance.put("/user/profile", { name });
      toast.success("Profile updated successfully!");
      if (fetchUser) await fetchUser(); // Refresh global context
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const changePassword = async () => {
    if (!currentPassword || !newPassword) return toast.error("Please fill all fields");
    try {
      await axiosInstance.put("/user/change-password", { currentPassword, newPassword });
      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setShowPassFields(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    const toastId = toast.loading("Uploading image...");
    setLoading(true);
    try {
      await axiosInstance.patch("/user/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (fetchUser) await fetchUser();
      toast.success("Profile picture updated!", { id: toastId });
    } catch (error) {
      toast.error("Upload failed", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        {/* Left Side: Info & Actions */}
        <div className="flex-1 p-8 md:p-12 space-y-6">
          <div className="space-y-4">
            {isEditing ? (
              <div className="space-y-3 animate-in fade-in duration-300">
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-2xl font-bold p-2 border-b-2 border-black outline-none"
                  placeholder="Your Name"
                />
                
                <div className="flex gap-2 pt-2">
                  <button onClick={handleUpdateProfile} className="px-4 py-2 bg-black text-white rounded-lg text-sm">Save Changes</button>
                  <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{user?.name}</h1>
                <p className="text-lg text-gray-500 mt-1">{user?.email}</p>
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="mt-3 text-sm font-semibold text-blue-600 hover:underline"
                >
                  Edit Profile Info
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <button 
              onClick={() => setShowPassFields(!showPassFields)}
              className="px-6 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
            >
              {showPassFields ? "Cancel Change" : "Change Password"}
            </button>

            {showPassFields && (
              <div className="space-y-3 p-5 bg-gray-50 rounded-2xl border border-gray-200 animate-in fade-in slide-in-from-top-4 duration-300">
                <input 
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                  placeholder="Current Password"
                />
                <input 
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                  placeholder="New Password"
                />
                <button 
                  onClick={changePassword}
                  className="w-full py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800"
                >
                  Save Password
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Profile Picture */}
        <div className="w-full md:w-2/5 bg-gray-50 flex flex-col items-center justify-center p-12 border-l border-gray-100">
          <div className="relative group">
            <img 
              src={user?.avatar?.url || assetLogo} 
              alt="Profile" 
              className="w-48 h-48 rounded-2xl object-cover shadow-2xl transform transition-transform group-hover:scale-[1.02]"
            />
           <label className="absolute -bottom-2 -right-2 bg-white p-3 rounded-2xl shadow-xl cursor-pointer hover:bg-gray-50 transition-all border border-gray-100 active:scale-90 group/icon">
      {/* Pencil Icon (Lucide-style Edit path) */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="#2A6FA8" /* Using your brand blue */
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="group-hover/icon:rotate-12 transition-transform"
      >
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
      </svg>
      <input type="file" className="hidden" onChange={handleImageUpload} disabled={loading} />
    </label>
          </div>
          <p className="mt-8 text-sm text-gray-400 font-medium">Click icon to update photo</p>
        </div>

      </div>
    </div>
  );
};

export default Profile;
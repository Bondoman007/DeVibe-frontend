import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera, User2, X, Plus, Loader2 } from "lucide-react";
import axios from "axios";
import { addUser, removeUser, updateUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const userState = useSelector((store) => store.user);

  const [profile, setProfile] = useState(userState || {});

  const [skillInput, setSkillInput] = useState(profile.skills || []);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(profile.photoUrl || "");
  const navigate = useNavigate();
  if (!profile) return;
  useEffect(() => {
    if (userState) {
      setProfile(userState);
      setPreviewUrl(userState.photoUrl || "");
    }
  }, [userState]);

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result); // Show preview instantly
      };
      reader.readAsDataURL(file);

      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "profile_picture"); // Set your Cloudinary upload preset

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dg9ccgvnu/image/upload",
          formData
        );

        const uploadedImageUrl = response.data.secure_url;
        setProfile((prev) => ({ ...prev, photoUrl: uploadedImageUrl })); // Update with URL
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSkillAdd = () => {
    if (skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName: profile.firstName,
          lastName: profile.lastName,
          gender: profile.gender,
          skills: profile.skills,
          photoUrl: profile.photoUrl,
          about: profile.about,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(response.data?.data));
      setProfile(response.data?.data);
      setIsLoading(false);
      // navigate("/");
    } catch (error) {
      console.error("Error updating profile:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <form className="max-w-2xl mx-auto bg-[#141414] rounded-2xl shadow-xl overflow-hidden ">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="relative w-32 h-32 mx-auto mb-4">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-2 border-[#64ffda]"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-[#1b2d4d] flex items-center justify-center border-2 border-[#64ffda]">
                  <User2 className="w-12 h-12 text-[#64ffda]" />
                </div>
              )}
              <label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 bg-[#64ffda] p-2 rounded-full cursor-pointer hover:bg-[#4ad8be] transition-colors"
              >
                <Camera className="w-5 h-5 text-[#0a192f]" />
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </label>
            </div>
            <h2 className="text-2xl font-bold text-[#e6f1ff]">Edit Profile</h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[#8892b0]">
                  First Name
                </label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-md bg-[#232427] border-[#233554] text-[#e6f1ff] shadow-sm focus:border-[#64ffda] focus:ring focus:ring-[#64ffda] focus:ring-opacity-50 px-2 py-2 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#8892b0]">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                  className="mt-1 px-2 py-2 block w-full rounded-md bg-[#232427] border-[#233554] text-[#e6f1ff] shadow-sm focus:border-[#64ffda] focus:ring focus:ring-[#64ffda] focus:ring-opacity-50 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#8892b0]">
                Gender
              </label>
              <select
                value={profile.gender}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="mt-1 px-2 py-2 block w-full rounded-md bg-[#232427] border-[#233554] text-[#e6f1ff] shadow-sm focus:border-[#64ffda] focus:ring focus:ring-[#64ffda] focus:ring-opacity-50 sm:text-sm"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#8892b0]">
                About
              </label>
              <textarea
                rows={4}
                value={profile.about}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, about: e.target.value }))
                }
                // disabled={profile.about.length > 350}
                className="mt-1 px-2 py-2 block w-full rounded-md bg-[#232427] border-[#233554] text-[#e6f1ff] shadow-sm focus:border-[#64ffda] focus:ring focus:ring-[#64ffda] focus:ring-opacity-50 sm:text-sm"
                maxLength={300}
                placeholder="Tell us about yourself in 50 words..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#8892b0] mb-2">
                Skills
              </label>

              <div className="flex gap-2 flex-wrap mb-3">
                {profile.skills &&
                  profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#1b2d4d] text-[#64ffda] border border-[#64ffda]"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleSkillRemove(skill)}
                        className="ml-2 inline-flex items-center text-[#64ffda] hover:text-[#4ad8be]"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSkillAdd()}
                  placeholder="Add a skills up to 6"
                  maxLength={10}
                  className="block px-2 py-2 w-full rounded-md bg-[#232427] border-[#233554] text-[#e6f1ff] shadow-sm focus:border-[#64ffda] focus:ring focus:ring-[#64ffda] focus:ring-opacity-50 sm:text-sm"
                />
                <button
                  type="button"
                  disabled={profile.skills > 6}
                  onClick={handleSkillAdd}
                  className="inline-flex items-center px-4 py-2 border border-[#64ffda] text-sm font-medium rounded-md shadow-sm text-[#64ffda] bg-[#1b2d4d] hover:bg-[#233554] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#64ffda] focus:ring-offset-[#0a192f]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-[#64ffda] text-sm font-medium rounded-md shadow-sm text-[#0a192f] bg-[#64ffda] hover:bg-[#4ad8be] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#64ffda] focus:ring-offset-[#0a192f] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;

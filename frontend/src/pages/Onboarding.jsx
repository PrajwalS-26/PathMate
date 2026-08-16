import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import useAuthStore from '../store/useAuthStore';

function Onboarding() {
  const navigate = useNavigate();
  const { user, setProfile } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    branch: 'CSE',
    semester: '1',
    sgpa: '',
    learningMode: 'guided',
  });

  const branches = ['CSE', 'ISE', 'AIML'];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const learningModes = [
    { value: 'guided', label: 'Guided', description: 'Structured path with milestones' },
    { value: 'explorer', label: 'Explorer', description: 'Self-paced exploration' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare the data to send to backend
    const profileData = {
      id: user?.id,
      name: formData.name,
      branch: formData.branch,
      semester: parseInt(formData.semester),
      sgpa: parseFloat(formData.sgpa) || 0,
      learning_mode: formData.learningMode,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // For now, just log the data to console
    console.log('Onboarding Data:', profileData);
    console.log('Ready to send to backend API...');

    // TODO: In the next step, we'll add the actual API call here
    // Example:
    // const response = await fetch('http://localhost:8080/api/profile', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${session.access_token}`,
    //   },
    //   body: JSON.stringify(profileData),
    // });

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Store profile in Zustand store
    setProfile(profileData);

    // Redirect to dashboard
    navigate('/dashboard');
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Profile</h1>
          <p className="text-gray-600 mt-2">Help us personalize your learning journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="Enter your full name"
            />
          </div>

          {/* Branch Dropdown */}
          <div>
            <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">
              Branch
            </label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            >
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>

          {/* Semester Dropdown */}
          <div>
            <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">
              Semester
            </label>
            <select
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            >
              {semesters.map((semester) => (
                <option key={semester} value={semester}>
                  Semester {semester}
                </option>
              ))}
            </select>
          </div>

          {/* SGPA Field */}
          <div>
            <label htmlFor="sgpa" className="block text-sm font-medium text-gray-700 mb-1">
              Current SGPA
            </label>
            <input
              type="number"
              id="sgpa"
              name="sgpa"
              value={formData.sgpa}
              onChange={handleChange}
              min="0"
              max="10"
              step="0.1"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="e.g., 8.5"
            />
          </div>

          {/* Learning Mode Radio Buttons */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Learning Mode
            </label>
            <div className="grid grid-cols-2 gap-4">
              {learningModes.map((mode) => (
                <label
                  key={mode.value}
                  className={`relative flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.learningMode === mode.value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="learningMode"
                    value={mode.value}
                    checked={formData.learningMode === mode.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="font-semibold text-gray-900">{mode.label}</span>
                  <span className="text-xs text-gray-500 mt-1 text-center">{mode.description}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
              loading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              'Get Started'
            )}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          You can update your profile settings anytime later.
        </p>
      </div>
    </div>
  );
}

export default Onboarding;

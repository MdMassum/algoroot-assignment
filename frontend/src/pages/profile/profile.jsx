import React from 'react';
import { useSelector } from 'react-redux';

function Profile() {
    const user = useSelector((state) => state.user.currentUser);
    console.log(user)

    return (
        <div className="flex-1 flex flex-col px-4 min-h-screen mt-10 md:mt-0 md:ml-64 text-black">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            {user ? (
                <div className="bg-white rounded-lg space-y-3 w-full md:w-1/2">
                    <p className="text-lg font-semibold">UserName: <span className="font-normal">{user.username}</span></p>
                    <p className="text-lg font-semibold">Email: <span className="font-normal">{user.email}</span></p>
                    <p className="text-lg font-semibold">Joined: <span className="font-normal">{new Date(user.createdAt).toLocaleDateString()}</span></p>
                </div>
            ) : (
                <p className="text-lg text-red-500">No user information available.</p>
            )}
        </div>
    );
}

export default Profile;

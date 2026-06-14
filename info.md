# Project Information

## Pages Created
- **Create User Page**: Added `CreateUser.jsx` inside the admin folder to allow admins to create new users. Added its route at `/admin/users/create`.
- **Single Post Page**: Added `SinglePost.jsx` page to view a specific post in detail along with its comments. Added its route at `/post/:id`.
- **Comment Table**: Created `CommentTable.jsx` component to cleanly display the list of comments on the `SinglePost` page.

## Components Updated
- **User Table**: Modified `UserTable.jsx` to dynamically render user data passed via props.
- **Manage Users**: Updated `ManageUsers.jsx` to utilize the improved `UserTable` instead of simply rendering user data in `div` elements.

## Clean Up
- Removed unused files from the admin section (`EditBlog.jsx` and `EditUser.jsx`) to clean up the codebase.

export const checkPermission = (module, action) => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const payloadBase64 = token.split('.')[1];
        // handle base64 strings not padded properly
        const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const decodedPayload = JSON.parse(jsonPayload);
        const permissions = decodedPayload.permissions || [];

        // Example: "USERS:READ"
        const requiredPermission = `${module}:${action}`;
        
        return permissions.includes(requiredPermission);
    } catch (e) {
        console.error("Failed to parse token for permissions", e);
        return false;
    }
};

export const hasAnyPermission = (module, actions) => {
    return actions.some(action => checkPermission(module, action));
};

export const claimReq = {
    adminOnly: (c: any) => c.role == "Admin",
    adminOrClient: (c: any) => c.role === "Admin" || c.role == "Cliente"
}
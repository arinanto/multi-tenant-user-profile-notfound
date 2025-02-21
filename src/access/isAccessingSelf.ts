import type { Access } from "payload";

export const isAccessingSelf: Access = ({ req, id }) => req.user?.id === id;

import Api from "./clint";

export interface User {
  id?: string;
  name: string;
  email: string;
}

export const getUsers = () => {
  return Api.get<User[]>("/users");
};

export const createUser = (user: User) => {
  return Api.post<User>("/users", user);
};

export const updateUser = (id: string, user: User) => {
  return Api.put<User>(`/users/${id}`, user);
};

export const deleteUser = (id: string) => {
  return Api.delete(`/users/${id}`);
};
import axios from "axios";
import BaseUrl from "./BaseUrl";

const token = window.localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
export async function createBoard(board) {
  const res = await axios.post(BaseUrl + "/boards", board, {
    headers,
  });

  return res.data;
}

export async function createTask(task) {
  const res = await axios.post(BaseUrl + "/tasks", task, {
    headers,
  });

  return res.data;
}

export async function getBoards() {
  const token = window.localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const res = await axios({
    method: "GET",
    headers,
    url: BaseUrl + "/boards",
  });

  return res.data;
}

export async function getColumns(boardId) {
  const res = await axios({
    method: "GET",
    headers,
    url: BaseUrl + "/boards/" + boardId,
  });

  return res.data;
}

export async function signIn(phone, password) {
  const res = await axios.post(
    BaseUrl + "/user/login",
    {
      phone,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res;
}

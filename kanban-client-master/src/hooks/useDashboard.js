import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BOARDS_URL } from "../utils/api";

export default () => {
  const [boards, setBoards] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      getBoards(token);
    } else {
      navigate("/login");
    }
  }, []);
  const params = useParams();
  const boardId = params.id;
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (boardId && token) {
      getColumns(token);
    }
  }, [boardId]);

  const getBoards = async token => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: BOARDS_URL,
      });
      setBoards(res.data);
    } catch (error) {
      removeToken(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getColumns = async token => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: BOARDS_URL + `/${boardId}`,
      });

      setColumns(res.data);
    } catch (error) {
      removeToken(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeToken = error => {
    if (error?.response?.status === 403) {
      window.localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return {
    boards,
    columns,
    loading,
    setBoards,
    setColumns,
  };
};

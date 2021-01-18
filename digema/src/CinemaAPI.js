import axios from "axios";
axios.defaults.baseURL = "http://localhost:7777/";

/* MOVIES */

export const getAllMovies = () => {
  return axios
    .get("movies")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getMovieById = (id) => {
  return axios
    .get("movies/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addMovie = (body) => {
  return axios
    .post("movies", body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const editMovie = (id, body) => {
  return axios
    .put("movies/" + id, body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteMovie = (id) => {
  return axios
    .delete("movies/" + id)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

/* HALLS */

export const getAllHalls = () => {
  return axios
    .get("halls")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getHallById = (id) => {
  return axios
    .get("halls/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addHall = (body) => {
  return axios
    .post("halls", body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const editHall = (id, body) => {
  return axios
    .put("halls/" + id, body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteHall = (id) => {
  return axios
    .delete("halls/" + id)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

/* SEANSES */

export const getAllSeances = () => {
  return axios
    .get("seances")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getAllSeancesInDay = (date) => {
  return axios
    .get("seancesDate/" + date)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export const getCurrentSeances = (date) => {
  return axios
    .get("seancesCur/" + date)
    .then((response) => {
      console.log("____________");
      console.log(response);
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getAllSeancesInDayAndMovieID = (date, id) => {
  return axios
    .get("/seances/" + date + "/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getSeanceById = (id) => {
  return axios
    .get("seances/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getSeancesById = (id) => {
  return axios
    .get("seances1/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getViewOfMoviesByMovieId = (id) => {
  return axios
    .get("seancesView/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export const addSeance = (body) => {
  return axios
    .post("seances", body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const editSeance = (id, body) => {
  return axios
    .put("seances/" + id, body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteSeance = (id) => {
  return axios
    .delete("seances/" + id)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteSeanceByMovieID = (id) => {
  return axios.delete("seancesList/" + id)
    .then(response => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export const editSeanceByMovieID = (body) => {
  return axios.put("seancesListEditMovies/", body)
    .then(response => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}
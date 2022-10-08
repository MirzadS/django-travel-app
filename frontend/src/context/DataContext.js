import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import api from "../api/axios";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const history = useHistory();

  const [dropdownTrip, setDropdownTrip] = useState([]);
  const [markers, setMarkers] = useState({});
  const [homePageData, setHomePageData] = useState({});
  const [myTravelsData, setMyTravelsData] = useState([]);
  const [plannedTravelsData, setPlannedTravelsData] = useState([]);
  const [tripRequestsData, setTripRequestsData] = useState([]);
  const [pastTravels, setPastTravels] = useState({});

  const [search, setSearch] = useState("");

  const [token, setToken] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  const dropdownList = (destination_id) => {
    const result = homePageData.zavrsena_putovanja.filter(
      (obj) => obj.destination_id == destination_id
    );

    setDropdownTrip(result);
  };

  const deleteTrip = (id) => {
    api
      .delete(`/putovanja/izbrisi-putovanje/${id}`)
      .then((res) => {
        history.go(0);
      })
      .catch((err) =>
        alert(
          "Greška prilikom brisanja putovanja: " + JSON.stringify(err.message)
        )
      );
  };
  const deletePlannedTrip = (id, user_id, role_id) => {
    api
      .delete(`/putovanja/izbrisi-putovanje/${id}/${user_id}/${role_id}`)
      .then((res) => {
        history.go(0);
      })
      .catch((err) =>
        alert(
          "Greška prilikom brisanja planiranog putovanja: " +
            JSON.stringify(err.message)
        )
      );
  };

  const tripSingUp = (id) => {
    api
      .post(`/putovanja/prijava-na-putovanje`, {
        trip_id: id,
        user_id: token.user_id,
      })
      .then((res) => {
        alert("Uspješno prijavljeno.");
      })
      .catch((err) =>
        alert(
          "Greška prilikom prijave na putovanje: " + JSON.stringify(err.message)
        )
      );
  };

  const saveChangesForTrip = (
    e,
    id,
    title,
    description,
    startDate,
    endDate,
    minNumber,
    maxNumber,
    image
  ) => {
    e.preventDefault();

    if (image) {
      const uploadData = new FormData();

      uploadData.append("img", image, image.name);
      uploadData.append("trip_id", id);
      uploadData.append("title", title);
      uploadData.append("description", description);
      uploadData.append("startDate", startDate);
      uploadData.append("endDate", endDate);
      uploadData.append("minNumber", minNumber);
      uploadData.append("maxNumber", maxNumber);

      api
        .post("/putovanja/image_post", uploadData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => history.push("/pocetna"))
        .catch((err) => alert(err));
    } else {
      api
        .post(
          "/putovanja/image_post",
          {
            trip_id: id,
            title,
            description,
            startDate,
            endDate,
            minNumber,
            maxNumber,
            img: "",
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => history.push("/pocetna"))
        .catch((err) => alert(err));
    }
  };
  const addTravel = (
    e,
    agencyId,
    title,
    description,
    typeOfTravel,
    startDate,
    endDate,
    minNumber,
    maxNumber,
    image
  ) => {
    e.preventDefault();

    if (image) {
      const uploadData = new FormData();

      uploadData.append("img", image, image.name);
      uploadData.append("agency_id", agencyId);
      uploadData.append("title", title);
      uploadData.append("description", description);
      uploadData.append("typeOfTravel", typeOfTravel);
      uploadData.append("startDate", startDate);
      uploadData.append("endDate", endDate);
      uploadData.append("minNumber", minNumber);
      uploadData.append("maxNumber", maxNumber);

      api
        .post("/putovanja/dodaj-putovanje", uploadData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => history.push("/pocetna"))
        .catch((err) => alert(err));
    } else {
      api
        .post(
          "/putovanja/dodaj-putovanje",
          {
            agency_id: agencyId,
            title,
            description,
            typeOfTravel,
            startDate,
            endDate,
            minNumber,
            maxNumber,
            img: "",
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => history.push("/pocetna"))
        .catch((err) => alert(err));
    }
  };

  const myTravels = () => {
    api
      .get(`/putovanja/moja-putovanja/${token.user_id}/${token.role}`)
      .then((res) => {
        // alert(JSON.stringify(res.data));

        setMyTravelsData(res.data);
      })
      .catch((err) =>
        alert(
          "Greska prilikom dobavljanja liste moja putovanja: " +
            JSON.stringify(err.message)
        )
      );
  };

  const PlannedTravelsFun = () => {
    api
      .get(`/putovanja/planirana-putovanja/${token.user_id}/${token.role}`)
      .then((res) => {
        setPlannedTravelsData(res.data.planned_trips);

        setTripRequestsData(res.data.trip_requests);
      })
      .catch((err) =>
        alert(
          "Greska prilikom dobavljanja liste planiranih putovanja: " +
            JSON.stringify(err.message)
        )
      );
  };

  const odobriZahtjev = (id) => {
    api
      .post(`/putovanja/odobri-zahtjev`, { id })
      .then((res) => {
        history.go(0);
      })
      .catch((err) =>
        alert(
          "Greska prilikom odobravanja zahtjeva: " + JSON.stringify(err.message)
        )
      );
  };

  const odbijZahtjev = (id) => {
    api
      .post(`/putovanja/odbij-zahtjev`, { id })
      .then((res) => {
        history.go(0);
      })
      .catch((err) =>
        alert(
          "Greska prilikom odbijanja zahtjeva: " + JSON.stringify(err.message)
        )
      );
  };

  const homePageFun = () => {
    api
      .get(`/putovanja/pocetna/${token.user_id}/${token.role}`)
      .then((res) => {
        // alert(JSON.stringify(res.data));

        setHomePageData(res.data);
      })
      .catch((err) =>
        alert(
          "Greska prilikom dobavljanja liste organizovanih putovanja: " +
            JSON.stringify(err.message)
        )
      );
  };

  const UserRegistrationPOST = async (
    e,
    firstName,
    lastName,
    username,
    email,
    password_1,
    password_2
  ) => {
    e.preventDefault();

    if (
      firstName.trim().length == 0 ||
      lastName.trim().length == 0 ||
      username.trim().length == 0 ||
      email.trim().length == 0 ||
      password_1.trim().length == 0 ||
      password_2.trim().length == 0
    )
      return alert("Sva polja moraju biti popunjena.");

    if (password_1 !== password_2)
      return alert("Niste unijeli ispravno password.");

    api
      .post("/putovanja/registracija-korisnik", {
        f_name: firstName,
        l_name: lastName,
        username: username,
        email: email,
        password: password_1,
      })
      .then((res) => {
        alert("Korisnik je registrovan.");
        history.push("/login");
      })
      .catch((err) =>
        alert("Korisnik nije registrovan: " + JSON.stringify(err.message))
      );
  };

  const AgencyRegistrationPOST = async (
    e,
    agencyName,
    email,
    established,
    password_1,
    password_2
  ) => {
    e.preventDefault();
    if (
      agencyName.trim().length == 0 ||
      email.trim().length == 0 ||
      password_1.trim().length == 0 ||
      password_2.trim().length == 0
    )
      return alert("Sva polja moraju biti popunjena.");

    if (password_1 !== password_2)
      return alert("Niste unijeli ispravno password.");

    api
      .post("/putovanja/registracija-agencija", {
        agencyName: agencyName,
        email: email,
        password: password_1,
        established: established,
      })
      .then((res) => {
        alert("Agencija je registrovana.");
        history.push("/login");
      })
      .catch((err) =>
        alert("Agencija nije registrovana: " + JSON.stringify(err.message))
      );
  };

  const LoginPOST = async (e, username, password) => {
    e.preventDefault();

    if (username.trim().length == 0 || password.trim().length == 0) {
      alert("Unesite podatke u sva polja.");
      return;
    }

    api
      .post("/putovanja/login/token", {
        username: username,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("authTokens", JSON.stringify(res.data.access));
        setToken(jwt_decode(res.data.access));
        history.push("/pocetna");
      })
      .catch((err) => alert("Korisnik ne postoji."));
  };

  const NewPassword = (e, email) => {
    e.preventDefault();

    api
      .post("/putovanja/mail", {
        email: email,
      })
      .then((res) => {
        alert("Mail poslat: " + JSON.stringify(res.data));
      })
      .catch((err) => alert("Uneseni email ne postoji."));
  };

  const deleteToken = () => {
    localStorage.removeItem("authTokens");
    setToken(null);
  };

  return (
    <DataContext.Provider
      value={{
        LoginPOST,
        NewPassword,
        deleteToken,
        UserRegistrationPOST,
        AgencyRegistrationPOST,
        homePageFun,
        homePageData,
        dropdownTrip,
        setDropdownTrip,
        dropdownList,
        myTravels,
        myTravelsData: myTravelsData.filter(
          ({ city_name, description }) =>
            city_name.toLowerCase().includes(search.toLocaleLowerCase()) ||
            description.toLowerCase().includes(search.toLocaleLowerCase())
        ),
        PlannedTravelsFun,
        plannedTravelsData: plannedTravelsData.filter(
          ({ city_name, description }) =>
            city_name.toLowerCase().includes(search.toLocaleLowerCase()) ||
            description.toLowerCase().includes(search.toLocaleLowerCase())
        ),
        setPlannedTravelsData,
        token,
        deleteTrip,
        tripSingUp,
        saveChangesForTrip,
        deletePlannedTrip,
        tripRequestsData,
        odobriZahtjev,
        odbijZahtjev,
        search,
        setSearch,
        addTravel,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;

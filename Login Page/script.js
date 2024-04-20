const frm = document.querySelector(".login-frm");
const inputFields = document.querySelectorAll("input");
const errMsg = document.querySelector(".err-msg");

const showErrorMessage = (msg) => {
  errMsg.innerText = msg;
  errMsg.classList.remove("hidden");
};

const hideErrorMessage = () => {
  errMsg.innerText = "";
  errMsg.classList.add("hidden");
};

inputFields.forEach((field) =>
  field.addEventListener("focus", () => {
    field.classList.remove("error");
    if (document.querySelector("input.error") == null) {
      hideErrorMessage();
    }
  })
);

frm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const frmData = new FormData(frm);
  const jsonData = Object.fromEntries(frmData.entries());

  try {
    const res = await fetch(
      "https://portfolio-backend-ktej.onrender.com/api/users/login",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify(jsonData),
      }
    );

    const jsonResponse = await res.json();
    if (res.ok) {
      showTable(jsonResponse);
    } else {
      inputFields.forEach((field) => {
        field.classList.add("error");
        showErrorMessage(jsonResponse.message);
      });
    }
  } catch (err) {
    inputFields.forEach((field) => {
      field.classList.add("error");
      showErrorMessage(err);
    });
    console.log(err);
  }
});

const prepareTable = (data) => {
  // DateTime String representation
  data.forEach((rowData) => {
    const dateTimeString = rowData["createdAt"];
    const formattedDateTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      // hour: "2-digit",
      // minute: "2-digit",
      // second: "2-digit",
      timeZone: "UTC",
    }).format(new Date(dateTimeString));
    console.log(formattedDateTime);
    rowData["createdAt"] = formattedDateTime.replace(",", "");
  });

  // Create a table element
  const table = document.createElement("table");

  // Create a table header and row element
  const headerContainer = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const headers = ["createdAt", "name", "email", "phone", "address", "message"];

  // Create table headers (th elements) and append to the header row
  headers.forEach((header) => {
    const headerElement = document.createElement("th");
    headerElement.textContent = header;
    headerRow.appendChild(headerElement);
  });

  // Append table header row to the header container
  headerContainer.appendChild(headerRow);

  // Append the header container to the table
  table.appendChild(headerContainer);

  // Create a table body
  const bodyContainer = document.createElement("tbody");

  // Append the body container to the table
  table.appendChild(bodyContainer);

  data.forEach((rowData) => {
    const row = document.createElement("tr");

    headers.forEach((header) => {
      const cell = document.createElement("td");
      cell.textContent = rowData[header];
      row.appendChild(cell);
    });
    bodyContainer.appendChild(row);
  });
  return table;
};

const showTable = async (response) => {
  const token = response.userData.token;
  try {
    const res = await fetch(
      "https://portfolio-backend-ktej.onrender.com/api/contact/get_all_messages",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      }
    );

    const jsonResponse = await res.json();
    if (res.ok) {
      const table = prepareTable(jsonResponse.data);
      console.log(table);
      const dataTable = document.querySelector(".data-table");
      document.querySelector(".card").classList.add("hidden");
      dataTable.appendChild(table);
    }
  } catch (err) {
    console.log(err);
  }
};

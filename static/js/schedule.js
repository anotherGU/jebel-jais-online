document.addEventListener("DOMContentLoaded", () => {
  /* ---------- ACTIVITY MAP & DESCRIPTION ---------- */
  const activity = localStorage.getItem("activityName") || "Jais Flight";
  const titleEl = document.getElementById("activity-title");
  const descEl = document.getElementById("activity-desc");
  const mapEl = document.getElementById("activity-map");

  const detailsContainer = document.createElement("div");
  detailsContainer.className = "activity-details";
  if (mapEl && mapEl.parentElement) mapEl.parentElement.after(detailsContainer);

  const activityData = {
    "JAIS FLIGHT": {
      desc: "Soar over the Hajar Mountains on the world's longest zipline — pure adrenaline and panoramic beauty.",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193016.07876296408!2d56.07819277650473!3d25.98438545118623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef6633e40f1aff7%3A0x4ad5c210abe1de21!2sJebel%20Jais!5e0!3m2!1sru!2s!4v1762782544875!5m2!1sru!2s",
    },
    "JAIS SKY TOUR": {
      desc: "Glide through 5 km of mountain ziplines and sky bridges — adventure with scenic views at 1,600m altitude.",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193016.07876296408!2d56.07819277650473!3d25.98438545118623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef6633e40f1aff7%3A0x4ad5c210abe1de21!2sJebel%20Jais!5e0!3m2!1sru!2s!4v1762782544875!5m2!1sru!2s",
    },
    "BEAR GRYLLS EXPLORERS CAMP": {
      desc: "Learn survival skills in the rugged wilderness of Ras Al Khaimah, inspired by Bear Grylls himself.",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193016.07876296408!2d56.07819277650473!3d25.98438545118623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef6633e40f1aff7%3A0x4ad5c210abe1de21!2sJebel%20Jais!5e0!3m2!1sru!2s!4v1762782544875!5m2!1sru!2s",
    },
  };

  if (titleEl && descEl && mapEl) {
    titleEl.textContent = activity;
    const data =
      activityData[activity.toUpperCase()] || activityData["JAIS FLIGHT"];
    descEl.textContent = data.desc;
    mapEl.src = data.map;
  }

  /* ---------- DATE PICKER ---------- */
  const dpTrigger = document.getElementById("dp-trigger");
  const dpTriggerText = document.getElementById("dp-trigger-text");
  const dpModal = document.getElementById("dp-modal");
  const dpClose = document.getElementById("dp-close");
  const dpCancel = document.getElementById("dp-cancel");
  const dpPrev = document.getElementById("dp-prev");
  const dpNext = document.getElementById("dp-next");
  const dpMonthLabel = document.getElementById("dp-month-label");
  const dpGrid = document.getElementById("dp-grid");

  const confirmBtn = document.getElementById("confirm");
  const errorBox = document.getElementById("form-error");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  let viewDate = new Date(today.getFullYear(), today.getMonth(), 1);
  let selectedDate = null;

  const setStartOfDay = (d) => d.setHours(0, 0, 0, 0);
  const formatButtonDate = (date) =>
    date.toLocaleDateString("en-GB", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  const showError = (msg) => {
    errorBox.textContent = msg;
    errorBox.style.display = "block";
  };
  const hideError = () => (errorBox.style.display = "none");

  function updateArrows() {
    const isAtMin =
      viewDate.getFullYear() === minMonth.getFullYear() &&
      viewDate.getMonth() === minMonth.getMonth();
    dpPrev.disabled = isAtMin;
  }

  function renderCalendar() {
    dpGrid.innerHTML = "";
    dpMonthLabel.textContent = viewDate.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
    updateArrows();

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const first = new Date(year, month, 1);
    const firstDay = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++)
      dpGrid.appendChild(document.createElement("div"));

    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement("div");
      cell.className = "dp-cell";
      cell.textContent = day;
      const cellDate = new Date(year, month, day);
      setStartOfDay(cellDate);
      if (cellDate < today) {
        cell.classList.add("disabled");
      } else {
        cell.addEventListener("click", () => {
          document
            .querySelectorAll(".dp-cell.selected")
            .forEach((c) => c.classList.remove("selected"));
          cell.classList.add("selected");
          selectedDate = cellDate;
          dpTriggerText.textContent = formatButtonDate(cellDate);
          dpModal.style.display = "none";
        });
      }
      dpGrid.appendChild(cell);
    }
  }

  dpTrigger.addEventListener("click", () => {
    dpModal.style.display = "flex";
    renderCalendar();
  });
  dpClose.addEventListener("click", () => (dpModal.style.display = "none"));
  dpCancel.addEventListener("click", () => (dpModal.style.display = "none"));
  dpPrev.addEventListener("click", () => {
    const prev = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
    if (prev >= minMonth) viewDate = prev;
    renderCalendar();
  });
  dpNext.addEventListener("click", () => {
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
    renderCalendar();
  });

  /* ---------- CONFIRMATION MODAL ---------- */
  const confirmationModal = document.getElementById("confirmation-modal");
  const modalCancel = document.getElementById("modal-cancel");
  const modalConfirm = document.getElementById("modal-confirm");

  const confirmOfferName = document.getElementById("confirm-offer-name");
  const confirmOfferPrice = document.getElementById("confirm-offer-price");
  const confirmCustomerName = document.getElementById("confirm-customer-name");
  const confirmCustomerPhone = document.getElementById(
    "confirm-customer-phone"
  );
  const confirmDate = document.getElementById("confirm-date");
  const confirmTickets = document.getElementById("confirm-tickets");

  function showConfirmationModal() {
    const activityName = localStorage.getItem("activityName") || "JAIS FLIGHT";
    const price = localStorage.getItem("totalPrice") || "0";
    const name = localStorage.getItem("fullName") || "-";
    const phone = localStorage.getItem("phone") || "-";
    const date = selectedDate ? formatButtonDate(selectedDate) : "Not selected";
    const adults = localStorage.getItem("adultCount") || 1;
    const kids = localStorage.getItem("childCount") || 0;

    confirmTickets.textContent = `${adults} Adult${
      adults > 1 ? "s" : ""
    }, ${kids} Child${kids > 1 ? "ren" : ""}`;
    confirmOfferName.textContent = activityName;
    confirmOfferPrice.textContent = `${price} AED`;
    confirmCustomerName.textContent = name;
    confirmCustomerPhone.textContent = phone;
    confirmDate.textContent = date;

    confirmationModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  modalCancel.addEventListener("click", () => {
    confirmationModal.classList.remove("active");
    document.body.style.overflow = "";
  });

  modalConfirm.addEventListener("click", () => {
    confirmationModal.classList.remove("active");
    document.body.style.overflow = "";
    localStorage.setItem("selectedDate", selectedDate.toISOString());
    window.location.href = "/card";
  });

  confirmationModal.addEventListener("click", (e) => {
    if (e.target === confirmationModal) {
      confirmationModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && confirmationModal.classList.contains("active")) {
      confirmationModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  /* ---------- GO TO PAYMENT ---------- */
  confirmBtn.addEventListener("click", () => {
    hideError();
    if (!selectedDate) return showError("Please select a date.");
    showConfirmationModal();
  });

  /* ---------- TICKET SELECTION ---------- */
  const adultMinus = document.getElementById("adult-minus");
  const adultPlus = document.getElementById("adult-plus");
  const childMinus = document.getElementById("child-minus");
  const childPlus = document.getElementById("child-plus");
  const adultCountEl = document.getElementById("adult-count");
  const childCountEl = document.getElementById("child-count");
  const adultUnitEl = document.getElementById("adult-unit");
  const childUnitEl = document.getElementById("child-unit");
  const totalPriceEl = document.getElementById("total-price");

  let adultCount = 1;
  let childCount = 0;
  const basePrice = parseFloat(localStorage.getItem("price")) || 0;
  const childPrice = Math.round(basePrice * 0.8);

  adultUnitEl.textContent = `${basePrice.toFixed(2)} AED`;
  childUnitEl.textContent = `${childPrice.toFixed(2)} AED`;

  function updateTotals() {
    const total = adultCount * basePrice + childCount * childPrice;
    totalPriceEl.textContent = `${total.toFixed(2)} AED`;

    localStorage.setItem("adultCount", adultCount);
    localStorage.setItem("childCount", childCount);
    localStorage.setItem("totalPrice", total.toFixed(2));
  }

  adultMinus.addEventListener("click", () => {
    if (adultCount > 0) {
      adultCount--;
      adultCountEl.textContent = adultCount;
      updateTotals();
    }
  });

  adultPlus.addEventListener("click", () => {
    if (adultCount < 10) {
      adultCount++;
      adultCountEl.textContent = adultCount;
      updateTotals();
    }
  });

  childMinus.addEventListener("click", () => {
    if (childCount > 0) {
      childCount--;
      childCountEl.textContent = childCount;
      updateTotals();
    }
  });

  childPlus.addEventListener("click", () => {
    if (childCount < 10) {
      childCount++;
      childCountEl.textContent = childCount;
      updateTotals();
    }
  });

  updateTotals();
});

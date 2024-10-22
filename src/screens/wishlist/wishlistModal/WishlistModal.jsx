import { Grid, Modal } from "@mui/material";
import "./WishlistModal.css";
import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Btn from "../../../components/btn/Btn";

export default function WishlistModal({ open, onClose, order }) {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based, so add 1
    const year = date.getFullYear();
    return `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}/${year}`;
  };

  // Assuming `order?.step2Data?.changeTime` is your Firestore timestamp
  const firestoreTimestamp = order?.step2Data?.changeTime;

  // Convert Firestore timestamp to a JavaScript Date object
  const jsDate = firestoreTimestamp
    ? new Date(firestoreTimestamp.seconds * 1000)
    : null;

  // Format the JavaScript Date object as "2:05:00 AM"
  const formatTime = (date) => {
    if (!date) return "";

    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Use 12-hour time format with AM/PM
    };

    return date.toLocaleTimeString("en-US", timeOptions);
  };

  const innerDivClick = (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the outer div
  };
  console.log(order);
  return (
    <div>
      <Modal open={open}>
        <div className="wishlist-modal-style" onClick={onClose}>
          <div className="wishlist-modal-content" onClick={innerDivClick}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className="wishlist-modal-header">
                  <div className="wishlist-modal-heading">
                    Detalhes do pedido
                    <div onClick={onClose}>
                      <CancelIcon sx={{ fontSize: 29 }} />
                    </div>
                  </div>
                  <div className="wishlist-modal-id">
                    <div>#{order.orderID}</div>
                    {formatDate(order?.step1Data?.dateOfChange)}
                  </div>
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className="wishlist-modal-body">
                  <div className="wishlist-modal-subHeading">Dados:</div>
                  <div>
                    <div className="wishlist-text-heading">Nome:</div>
                    <div className="wishlist-text-content">
                      {order.step4Data.name}
                    </div>
                  </div>
                  <div>
                    <div className="wishlist-text-heading">E-mail:</div>
                    <div className="wishlist-text-content">
                      {order.step4Data.email}
                    </div>
                  </div>
                  <div>
                    <div className="wishlist-text-heading">Telefone:</div>
                    <div className="wishlist-text-content">
                      {order.step4Data.phone}
                    </div>
                  </div>
                  <Btn
                    icon={<WhatsAppIcon />}
                    label={"Voltar ao inicio"}
                    onClick={() => {}}
                    style={{
                      width: "100%",
                      height: "45px",
                      background: "#029711",
                      margin: "20px 0px",
                    }}
                  />
                  <div className="wishlist-modal-subHeading line-above">
                    Dados da mudança:
                  </div>
                  <div>
                    <div className="wishlist-text-heading1">Origem:</div>
                    <div className="wishlist-text-content">
                      {order?.step1Data?.originCity} /{" "}
                      {order?.step1Data?.originState}
                    </div>
                  </div>
                  <div>
                    <div className="wishlist-text-heading1">Destino:</div>
                    <div className="wishlist-text-content">
                      {order?.step1Data?.destinationCity} /{" "}
                      {order?.step1Data?.destinationState}
                    </div>
                  </div>
                  {order?.step2Data?.preferedTimeForMoving === "true" && (
                    <div>
                      <div className="wishlist-text-heading1">
                        Data da mudança:
                      </div>
                      <div className="wishlist-text-content">
                      {formatTime(jsDate)}
                      </div>
                    </div>
                  )}
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className="wishlist-modal-body">
                  <div
                    className="desktop-description-modal"
                    style={{ flexDirection: "column" }}
                  >
                    <div className="wishlist-text-heading1">Descrição:</div>
                    <div className="wishlist-text-content1">
                      {order.step3Data.moreDetailInformation}
                    </div>
                  </div>
                  <div className="wishlist-text-heading1 mt-desktop">
                    Listagem:
                  </div>
                  <div>
                    <div
                      className="wishlist-text-heading bolded"
                      style={{ fontWeight: "bold" }}
                    >
                      Item
                    </div>
                    <div
                      className="wishlist-text-content bolded"
                      style={{ fontWeight: "bold" }}
                    >
                      Quantitade
                    </div>
                  </div>
                  {order.step3Data.items.map((item) => (
                    <div className="wishlist-modal-underline-item">
                      <div className="wishlist-text-heading11">
                        {item.description}
                      </div>
                      <div className="wishlist-text-content11">
                        {item.quantity}
                      </div>
                    </div>
                  ))}

                  <br />
                  <div className="wishlist-modal-underline-item2">
                    <div className="wishlist-text-heading2">
                      Horário preferencial para a mudança:
                    </div>
                    <div className="wishlist-text-content2">
                      {order.step2Data.preferedTimeForMoving === "false"
                        ? "Não"
                        : "Sim"}
                    </div>
                  </div>
                  <div className="wishlist-modal-underline-item2">
                    <div className="wishlist-text-heading2">
                      Necessidade de montagem/desmonstagem:
                    </div>
                    <div className="wishlist-text-content2">
                      {order.step2Data.disassembleOrAssemble === "false"
                        ? "Não"
                        : "Sim"}
                    </div>
                  </div>
                  <div className="wishlist-modal-underline-item2">
                    <div className="wishlist-text-heading2">
                    Precisa de embalagem pela empresa de mudanças:
                    </div>
                    <div className="wishlist-text-content2">
                      {order.step2Data.needMovingCompany === "false"
                        ? "Não"
                        : "Sim"}
                    </div>
                  </div>
                  <div className="wishlist-modal-underline-item2">
                    <div className="wishlist-text-heading2">
                    A data é flexivel:
                    </div>
                    <div className="wishlist-text-content2">
                      {order.step2Data.isDateFlexible === "false"
                        ? "Não"
                        : "Sim"}
                    </div>
                  </div>

                  <div className="wishlist-modal-underline-item2">
                    <div className="wishlist-text-heading2">
                      Restrição ou taxa de trânsito:
                    </div>
                    <div className="wishlist-text-content2">{order.step2Data.restrictionOrFees === "false"
                        ? "Não"
                        : "Sim"} - R$15</div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </Modal>
    </div>
  );
}

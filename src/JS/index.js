//***** code of modal ***************** */

const closeModal = document.getElementById("close_modal");
const addTask = document.getElementById("add_task");
const modal = document.getElementById("modal");
const ModalContainer = document.querySelector(".modal-cantainer");

const openModal = () => {
  ModalContainer.classList.toggle("modal-visivility");
  modal.classList.toggle("modal-close");
};

const close_Modal = () => {
  let timeModalGo = 600;
  modal.classList.toggle("modal-close");
  setTimeout(() => {
    ModalContainer.classList.toggle("modal-visivility");
  }, timeModalGo);
};

addTask.addEventListener("click", openModal);
closeModal.addEventListener("click", close_Modal);

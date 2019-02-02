import { API } from "@/utils/api";

export default {
  async getRoomList(context) {
    let response = await API.get("/room-list");
    context.commit("setRoomList", response.data.results);
  },
  async getRoomDetail(context, roomId) {
    let response = await API.get(`/rooms/${roomId}`);
    context.commit("setCurrentRoom", response.data);
  }
};

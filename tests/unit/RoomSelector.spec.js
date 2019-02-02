import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from 'vuex'
import RoomSelector from "@/components/RoomSelector.vue";
import mutations from "@/store/mutations.js";

const localVue = createLocalVue()

localVue.use(Vuex)

describe("RoomSelector.vue", () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      getRoomList: (context) => context.commit("setRoomList", [{
        name: 'room1'
      }, {
        name: 'room2'
      }])
    }
    store = new Vuex.Store({ actions, mutations });
  });

  it("renders rooms", () => {
    const wrapper = shallowMount(RoomSelector, {
      store, localVue,
      propsData: { selectedRoom: [] }
    });
    const options = wrapper.findAll('option');
    expect(options.length).toBe(2);
    expect(options.at(0).text()).toBe('room1');
    expect(options.at(1).text()).toBe('room2');
  });
});

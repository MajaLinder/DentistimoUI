import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        timeslot: localStorage.getItem('timeslot'),
        clinic_name: localStorage.getItem('clinic_name'),
        address: localStorage.getItem('address'),
        TestAName: "",
    },
    mutations: {
        setTimeSlot(state, timeslotData) {
            var stringTimeSlot = JSON.stringify(timeslotData);
            localStorage.setItem('timeslot', stringTimeSlot);
        },
        setClinic(state, name) {
            var stringName = JSON.stringify(name);
            localStorage.setItem('clinic_name', stringName);
        },
        setAddress(state, address) {
            var stringAddress = JSON.stringify(address);
            localStorage.setItem('address', stringAddress);
        },
    }
});

<template>
  <div>
    <b-container>
      <b-row>
        <b-col class="test" cols="8">
          <Map v-on:update-chosenClinic="getTimeSlots($event)" />
        </b-col>
        <b-col v-if="!chosenClinic" class="rightCol">
          <div class="description">
            <h2>Book your dentist appointment online!</h2>
            <p>
              Here at Dentistimo you can book your dentist appointment for any
              clinic in Gothenburg. Start by picking a clinic on the map that is
              convenient for you.
            </p>
          </div>
        </b-col>
        <b-col v-show="chosenClinic" class="rightCol">
          <TimeSlots :name="clinic_name" :address="clinic_address" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Map from "@/components/Map.vue";
import TimeSlots from "../components/TimeSlots.vue";
import Publisher from "../../mqttClient/pub";

export default {
  name: "Home",
  components: {
    Map,
    TimeSlots,
  },
  data: function () {
    return {
      chosenClinic: "",
      topic: "/clinicData",
      qos: 1,
      publisher: new Publisher(),
      clinic_name: "",
      clinic_address: "",
    };
  },
  methods: {
    //Takes selected clinic and stores data about it and pub to availabilityChecker
    getTimeSlots: function (aClinic) {
      var clinic = JSON.stringify(aClinic);
      this.setChosenClinic(clinic);
      this.sendData();
    },
    //Stor data about clinic in data
    setChosenClinic(clinic) {
      this.$store.state.TestAName = clinic.name;
      this.chosenClinic = clinic;
      var clin = JSON.parse(clinic);
      this.clinic_name = clin.name;
      this.clinic_address = clin.address;
      this.$store.commit('setClinic', clin.name);
      this.$store.commit('setAddress', clin.address);
      this.$store.state.TestAName = clin.name;
      console.log("TestAName is " + this.$store.state.TestAName)

    },
    //Pub to availabilityChecker the selected clinic
    sendData() { //
      console.log("Clinc new timeslots " + this.chosenClinic);
      this.publisher.pubToTopic(this.topic, this.chosenClinic, this.qos); //Press "See avaiability"
    },
  },
};
</script>

<style scoped>
.test {
  border: black;
}

h2 {
  font-size: 160%;
  font-weight: 1000;
}

.description {
  text-align: center;
  color: #e5f9e0;
  font-weight: 1000;
  font-size: 25px;
  padding-left: 7%;
  padding-right: 7%;
  padding-top: 30%;
}

.rightCol{
  background-color: #e5f9e02f;
}
</style>

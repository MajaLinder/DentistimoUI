<template>
  <div style="padding-top: 30pt">
    <h1>{{ name }}</h1>
    <h3>{{ address }}</h3>
    <b-container class="list">
      <b-row v-bind:key="timeSlot.id" v-for="timeSlot in timeSlots">
        <b-col>
          <b-list-group>
            <b-list-group-item
              variant="info"
              class="flex-column align-items-start"
            >
              <div>
                <b-container>
                  <b-row>
                    <b-col cols="6" style="padding-left: 1%">
                      <h5>
                        {{ timeSlot.d_name }}
                        {{ timeSlot.date.d_number }}/{{ timeSlot.date.month }}
                        {{ timeSlot.date.year }}
                      </h5>
                    </b-col>
                    <b-col cols="3">
                      <h5 style="font-size: 15px; text-align: center">{{ timeSlot.time }}</h5>
                    </b-col>
                    <b-col cols="3"> 
                      <b-button
                        class="btn-primary"
                        v-on:click="book(timeSlot, name, address)"
                        >Book
                      </b-button></b-col
                    >
                  </b-row>
                </b-container>
              </div>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { client } from "../../mqttClient/mqtt";
import subscriber from "../../mqttClient/sub"

export default {
  name: "TimeSlots",
  props: ["name", "address"],
  data() {
    return {
      timeSlots: [],
      subscriber: new subscriber(),
      clinic_name: JSON.parse(this.$store.state.clinic_name),
      clinic_address: JSON.parse(this.$store.state.address),
    };
  },
  mounted() {
    console.log("name is " + this.clinic_name);
    
    this.listenToTopic();
  },
  methods: {
    book(timeslot, name) {
      this.$store.commit("setTimeSlot", timeslot)
      this.$router.push(`/booking/${name}`);
      location.reload();
    },
    listenToTopic() {
      console.log("saved in the store NEW = " + this.clinic_name)

      this.subscriber.subToTopic(`/availableTimeslots/#`, 1);
      client.on("message", (topic, message) => {
        if (this.$store.state.TestAName === "The Crown" && topic === "/availableTimeslots/The Crown") {
          this.timeSlots = JSON.parse(message);
          console.log("Updated The Crown");
          return;
        }
        if (this.$store.state.TestAName === "Your Dentist" && topic === "/availableTimeslots/Your Dentist") {
          this.timeSlots = JSON.parse(message);
          console.log("Updated Your Dentist");
          return;
        }
        if (this.$store.state.TestAName === "Lisebergs Dentists" && topic === "/availableTimeslots/Lisebergs Dentists") {
          this.timeSlots = JSON.parse(message);
          console.log("Updated Lisebergs Dentists");
          return;
        }
        if (this.$store.state.TestAName === "Tooth Fairy Dentist" && topic === "/availableTimeslots/Tooth Fairy Dentist") {
          this.timeSlots = JSON.parse(message);
          console.log("Updated Tooth Fairy Dentist");
          return;
        }
        else{
          console.log("We are not interested in this new list")
        }
      });
    },
  },
};
</script>
<style scoped>
.btn-primary {
  border-color: transparent;
  margin: 2%;
  color: rgba(255, 255, 255, 0.822);
  font-weight: 1000;
  background-color: #40c9a2 !important;
  border-color: #40c9a2;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.226), 0 3px 3px 0 rgba(0, 0, 0, 0.055);
}

.btn-primary:hover {
  border: transparent !important;
  margin: 2%;
}

.list-group-item-info {
  color: #664147;
  background-color: #e5f9e0d3;
  font-weight: 1000 !important;
}

.list {
  max-height: 650px;
  margin-bottom: 10px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

h1,
h3 {
  color: #e5f9e0d3;
  text-align: center;
  font-weight: 1000;
}

</style>
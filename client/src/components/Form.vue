<template>
  <div class="booking" align="center">
    <h2>Booking Form</h2>
    <p>Please fill in your details to place your booking request</p>
    <b-card class="card" align="center">
      <b-row>
        <b-col>
          <h3>{{ clinic_name }}</h3>
          <h6>{{ clinic_address }}</h6>
          <br />
          <p class="cardText">{{ timeSlot.d_name }}</p>
          <p class="cardText">
            {{ timeSlot.date.d_number }}/{{ timeSlot.date.month }}
            {{ timeSlot.date.year }}
          </p>
          <p class="cardText">{{ timeSlot.time }}</p>
        </b-col>
        <b-col cols="8">
          <b-form @submit="onSubmit">
            <b-form-group class="input" label-for="first_name" align="center">
              <b-form-input
                id="input-1"
                class="input"
                type="text"
                placeholder="First name"
                v-model="first_name"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group class="input" label-for="last_name" align="center">
              <b-form-input
                id="input-2"
                class="input"
                type="text"
                placeholder="Last name"
                v-model="last_name"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group class="input" label-for="user_id" align="center">
              <b-form-input
                id="input-3"
                class="input"
                type="number"
                placeholder="SSN"
                v-model="user_id"
                required
              ></b-form-input>
            </b-form-group>

            <div>
              <b-button variant="primary" type="submit" class="send"
                >Submit
              </b-button>
              <b-button
                variant="primary"
                type="button"
                class="send"
                @click="toHome"
                >Return to Home
              </b-button>
            </div>
          </b-form>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import Publisher from "../../mqttClient/pub";
import Subscriber from "../../mqttClient/sub";
import { client } from "../../mqttClient/mqtt";
import { uuid } from "vue-uuid";

export default {
  data() {
    return {
      timeSlot: JSON.parse(this.$store.state.timeslot),
      clinic_name: JSON.parse(this.$store.state.clinic_name),
      clinic_address: JSON.parse(this.$store.state.address),
      user_id: "",
      first_name: "",
      last_name: "",
      issuance: "",
      topic: "/bookingRequest",
      qos: 2,
      publisher: new Publisher(),
      subscriber: new Subscriber(),
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      const date = JSON.stringify(this.timeSlot.date);
      const time = this.timeSlot.time;
      var issuance = new Date();
      issuance = issuance.getTime();
      this.issuance = issuance;
      var request_id = uuid.v1();

      this.sendRequest(date, time, request_id);
    },
    sendRequest(date, time, request_id) {
      var appointment = {
        issuance: `${this.issuance}`,
        request_id: `${request_id}`,
        clinic_name: `${this.clinic_name}`,
        date: `${date}`,
        time: `${time}`,
        user_id: `${this.user_id}`,
        first_name: ` ${this.first_name}`,
        last_name: ` ${this.last_name}`,
      };
      var ap = JSON.stringify(appointment);

      this.publisher.pubToTopic(this.topic, ap, this.qos);
      this.listenToTopic(request_id, ap);
    },
    listenToTopic(request_id, appointment) {
      this.subscriber.subToTopic(`/Confirmation/${request_id}`, 2);
      client.on("message", (topic, message) => {
        if (topic === `/Confirmation/${request_id}`) {
          if (message.toString() === appointment) {
            this.$router.push(`/booking/${this.clinic_name}/${request_id}`);
          } else {
            this.$router.push(`/rejection/${this.clinic_name}/${request_id}`);
          }
        }
      });
    },
    toHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
input {
  width: 90%;
  padding: 10px;
  outline: none;
}
input:focus {
  border: 2px solid #40c9a2;
}

.send {
  background-color: #40c9a2 !important;
  border-color: transparent;
  margin-top: 4%;
  width: 40%;
  padding: 1%;
  margin: 4%;
  color: #ffff;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.048), 0 3px 3px 0 rgba(0, 0, 0, 0.055);
}

.send:hover {
  border-color: transparent;
  color: #fdfcdc;
  background-color: #40c9a2 !important;
}

.cardText {
  color: #664147;
  font-size: 20px;
  font-weight: 900;
}

h6,
h1,
h3 {
  color: #664147;
  font-weight: 900;
  font-size: 25px;
}
h2 {
  color: #e5f9e0;
  font-size: 30px;
  font-weight: 900;
}

p {
  color: #e5f9e0;
  font-size: 20px;
  font-weight: 900;
}

.card {
  padding-top: 50px;
  padding-bottom: 50px;
  width: 70%;
  background-color: #e5f9e0;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.input {
  padding: 1%;
}
</style>
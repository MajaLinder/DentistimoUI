# UI

This is the UI component for the Dentistimo software. It subscribes to a collection of dentistries in the city of Gothenburg and allows the user to see available timeslots in which to book dentist appointments, as well as lets the user make dentist booking appointments at any of the dentistries. 


## Client Structure

| File        | Purpose           | 
| ------------- | ------------- |
| [README.md](./README.md) | Everything about the client |
| [public/index.html](public/index.html) | Static HTML entry point page |
| `src/` | src (i.e., source code) | 
| [src/App.vue](src/App.vue) | Main Vue layout template for all view (or pages) |
| `src/diagrams/` | Graphical resources |
| `src/components/` | Vue components that are reusable LEGO blocks |
| [src/main.js](src/main.js) | Main JavaScript entry point | 
| [src/router.js](src/router.js) | Vue routes configuration |
| `src/views/` | Vue components that are separate pages/views |
| [src/views/Home.vue](src/views/Home.vue) | Home page/view |
| [package.json](package.json) | Project meta-information | 
| [vue.config.js](vue.config.js) | Vue configuration |


# Component diagram
 
![UI](/diagrams/UI.png)




## Requirements

To run the ClinicRegistry the client needs to have the following software installed on their machine.
Node.js v14.17.6 or later
mqtt.js v4.2.8 or later

## Project setup
Installs all project dependencies specified in [package.json](./package.json).

1- Map to the client directory. by entering this in the terminal 
```
cd client 
```
```
cd src 
```
2- Install the dependencies >>
```
npm install
```

### Compiles and hot-reloads for development
3- Run your client on the browser.
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

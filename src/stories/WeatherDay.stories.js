import React from "react";
import { default as WeatherDay } from "../components/WeatherDay";
import '../App.css'

export default {
    title: "WeatherDay",
    component: WeatherDay,
};

const Template = (args) => <WeatherDay {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
    index: 0,
    day: "Sunday",
    comment: "Cloudy",
    maxF: "60",
    minF: "40",
    maxRange: "25",
    absMin: "40",
    absMax: "65",
};

export const SecondStory = Template.bind({});

SecondStory.args = {
    index: 0,
    day: "Sunday",
    comment: "Cloudy",
    maxF: "60",
    minF: "40",
    maxRange: "25",
    absMin: "40",
    absMax: "65",
};

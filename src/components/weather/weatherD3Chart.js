import React, {useEffect, useState} from 'react'
import * as d3 from "d3";
import './WeatherD3Chart.css'

const WeatherD3Chart = (props) => {
    const data = props.weather
    const dataNight = data.map((d)=>d.night)
    const minNight = Math.min(...dataNight)
    const maxNight = Math.max(...dataNight)
    const dataDay = data.map((d)=>d.day)
    const minDay = Math.min(...dataDay)
    const maxDay = Math.max(...dataDay)
    const allMax = Math.max(...[maxNight,maxDay])
    const allMin = Math.min(...[minNight,minDay])
    const domainTempr = [allMin, allMax]
    const dayNames = data.map( (d) => d.name)
    const city = props.city
    
    useEffect(() => {
        
        var svg = d3.select("#WeatherD3Chart"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;

        svg.append("text")
        .classed("chartTitle", true)
        .attr("transform", "translate(100,0)")
        .attr("x", 50)
        .attr("y", 50)
        .attr("font-size", "24px")
        .text(`Weather forecast for ${city}`)

        var x_axis = d3.scaleBand()
        .domain( dayNames )
        .range([0, width])
        .padding(0.4)

        var y_axis = d3.scaleLinear()
        .domain(domainTempr)
        .range([height,0]);


        var g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")")
        .attr("class", "Wrap");

            
        g.append("g")
        .classed("Days", true)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x_axis))
        .append("text")
        .attr("y", height - 250)
        .attr("x", width - 100)
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Days")

        g.append("g")
        .classed("Temp", true)
        .call(d3.axisLeft(y_axis).tickFormat((d) => `${d} C°`).ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("dy", "-5.1em")
        .attr("text-anchor", "end")
        .attr("stroke", "red")
        .text("Temp C°")
            
            
            
        g.selectAll(".barNight")
        .data(dataNight)
        .enter().append("rect")
        
        .on("mouseover", onMouseOver) //Add listener for the mouseover event
        .on("mouseout", onMouseOut)   //Add listener for the mouseout event
        .attr("x", (d, i) =>  x_axis.bandwidth()*0.6 + i*x_axis.bandwidth()*1.67 )
        .attr("y", (d)=> d < 0 ? y_axis(0) : y_axis(d) )
        .attr("width", x_axis.bandwidth()/2)
        .transition()
        .ease(d3.easeLinear)
        .duration(400)
        .delay((d, i) => i * 50)
        .attr("height", (d) => d < 0 ? y_axis(d) - y_axis(0):y_axis(0) - y_axis(d))
        .attr("class", "barNight")
        .attr("data-phase", "barNight")
        .attr("data-name", (d) => `${d} night` )
        .attr("data-y", (d)=> d<0 ? y_axis(0) : y_axis(d) )
        .attr("data-height",(d)=> d<0 ? y_axis(0) : y_axis(d) )
        .attr("data-is_negative",(d)=> d<0 )

        g.selectAll(".barDay")
        .data(dataDay)
        .enter().append("rect")
        .on("mouseover", onMouseOver) //Add listener for the mouseover event
        .on("mouseout", onMouseOut)   //Add listener for the mouseout event
        .attr("x", (d, i) =>  x_axis.bandwidth()*1.2 + i*x_axis.bandwidth()*1.67 )
        .attr("y", (d)=> d < 0 ? y_axis(0) : y_axis(d) )
        .attr("width", x_axis.bandwidth()/2)
        .transition()
        .ease(d3.easeLinear)
        .duration(400)
        .delay((d, i) => i * 50)
        .attr("height", (d) => d < 0 ? y_axis(d) - y_axis(0):y_axis(0) - y_axis(d))
        .attr("class", "barDay")
        .attr("data-phase", "barDay")
        .attr("data-name", (d) => `${d} day` )
        .attr("data-y", (d)=> d<0 ? y_axis(0) : y_axis(d) )
        .attr("data-height",(d)=> d<0 ? y_axis(0) : y_axis(d) )
        .attr("data-is_negative",(d)=> d<0 )

        

        //mouseover event handler function
        function onMouseOver(d, i) {
            // console.log('this')
            // console.dir(this)
            d3.select(this).attr('class', `${this.dataset.phase} highlight`)
            .transition()     // adds animation
            .duration(400)
            .attr('width', x_axis.bandwidth()/2 + 2)
            .attr("x", this.attributes.x.nodeValue)
            

            g.append("text")
            .attr('class', 'val') 
            .attr('x', this.attributes.x.nodeValue -15)
            .attr('y',  this.attributes.y.nodeValue-5)
            .text(`C° ${this.dataset.name}`  // Value of the text
            );
        }

        //mouseout event handler function
        function onMouseOut(d, i) {
            // use the text label class to remove label on mouseout
            d3.select(this)
            .attr('class', `${this.dataset.phase}`);

            d3.select(this)
            .transition()     // adds animation
            .duration(400)
            .attr('width', x_axis.bandwidth()/2)
            .attr('x', this.attributes.x.nodeValue)
            

            d3.selectAll('.val')
            .remove()
        }

        return () => {
            console.log('clear0',props)
            d3.select("#WeatherD3Chart  .chartTitle").remove()
            d3.select("#WeatherD3Chart  .Temp").remove()
            d3.select("#WeatherD3Chart  .Days").remove()
            d3.select("#WeatherD3Chart  .Temp").remove()
            d3.selectAll("#WeatherD3Chart  .barNight").remove()
            d3.selectAll("#WeatherD3Chart  .barDay").remove()
            d3.selectAll("#WeatherD3Chart  .Wrap").remove()
        }

      

    }, [city, dataDay, dataNight, dayNames, domainTempr, props])

   
    
    return <div><svg id="WeatherD3Chart" width="600" height="500"></svg></div>
   
}

export default WeatherD3Chart

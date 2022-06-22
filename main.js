Vue.createApp({
  data: function(){
      return{
        count: 10000,
        tz: "Asia/Taipei"
      }
  },
  mounted: function(){
    dayjs.extend(window.dayjs_plugin_utc);
    dayjs.extend(window.dayjs_plugin_timezone);
    //console.log(Object.keys(window));

    this.TestTimezone();
    this.TestParsing();
    this.TestFormating();
    this.TestCompare();
    this.TestDiff();
    this.TestTransform();
  },
  methods:{
    TestTimezone: function(){
      let data = [];
      let startT,endT;

      //moment.js
      startT = new Date();
      for(let i=0;i<this.count;i++){
        const t = moment.tz(this.tz);
      }
      endT = new Date();
      data.push({
        "x": "moment",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });
      
      //date-fns (date-fns-tz沒有可用的cdn)
      startT = new Date();
      for(let i=0;i<this.count;i++){
        const t = new Date();
      }
      endT = new Date();
      data.push({
        "x": "dateFns",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //luxon
      startT = new Date();
      for(let i=0;i<this.count;i++){
        const t = luxon.DateTime.now().setZone(this.tz);
      }
      endT = new Date();
      data.push({
        "x": "luxon",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //dayjs
      startT = new Date();
      for(let i=0;i<this.count;i++){
        const t = dayjs().tz(this.tz);
      }
      endT = new Date();
      data.push({
        "x": "dayjs",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //js-joda
      startT = new Date();
      for(let i=0;i<this.count;i++){
        const t = JSJoda.ZonedDateTime.now(JSJoda.ZoneId.of(this.tz));
      }
      endT = new Date();
      data.push({
        "x": "js-joda",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //spacetime
      startT = new Date();
      for(let i=0;i<this.count;i++){
        const t = spacetime.now().goto(this.tz);
      }
      endT = new Date();
      data.push({
        "x": "spacetime",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //console.log(data);
      const options = {
        chart: {
          type: 'bar'
        },
        title: {
          text: " Test Time Zone",
        },
        series: [{
          data: data
        }],
        yaxis: {
          title: {
            text: "milliseconds"
          }
        }
      };
      const chart = new ApexCharts(document.querySelector("#testTimezone"), options);
      chart.render();
    },
    TestParsing: function(){
      let data = [];
      let startT,endT;
      const dateStr = "2022-06-21 18:38:30";
      //moment.js
      startT = new Date();
      for(let i=0;i<this.count;i++){
        const t = moment(dateStr, "YYYY-MM-DD HH:mm:ss");
      }
      endT = new Date();
      data.push({
        "x": "moment",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });
      
      //date-fns (date-fns-tz沒有可用的cdn)
      startT = new Date();
      for(let i=0;i<this.count;i++){
        const t = dateFns.parse(dateStr, "yyyy-MM-dd HH:mm:ss", new Date())
      }
      endT = new Date();
      data.push({
        "x": "dateFns",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //luxon
      startT = new Date();
      for(let i=0;i<this.count;i++){
        const t = luxon.DateTime.fromFormat(dateStr, "yyyy-MM-dd HH:mm:ss");
      }
      endT = new Date();
      data.push({
        "x": "luxon",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //dayjs
      startT = new Date();
      for(let i=0;i<this.count;i++){
        const t = dayjs(dateStr, "YYYY-MM-DD HH:mm:ss");
      }
      endT = new Date();
      data.push({
        "x": "dayjs",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //js-joda
      startT = new Date();
      for(let i=0;i<this.count;i++){
        const formatter = JSJoda.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        const t = JSJoda.LocalDateTime.parse(dateStr, formatter);
      }
      endT = new Date();
      data.push({
        "x": "js-joda",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //spacetime
      startT = new Date();
      for(let i=0;i<this.count;i++){
        const t = spacetime(dateStr);
      }
      endT = new Date();
      data.push({
        "x": "spacetime",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //console.log(data);
      const options = {
        chart: {
          type: 'bar'
        },
        title: {
          text: " Test Parsing",
        },
        series: [{
          data: data
        }],
        yaxis: {
          title: {
            text: "milliseconds"
          }
        }
      };
      const chart = new ApexCharts(document.querySelector("#testParsing"), options);
      chart.render();
    },
    TestFormating: function(){
      let data = [];
      let startT,endT;
      let t;
      //moment.js
      startT = new Date();
      t = moment().tz(this.tz);
      for(let i=0;i<this.count;i++){
        const tStr = t.format("YYYY-MM-DD HH:mm:ss");
      }
      endT = new Date();
      data.push({
        "x": "moment",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });
      
      //date-fns (date-fns-tz沒有可用的cdn)
      startT = new Date();
      t = new Date();
      for(let i=0;i<this.count;i++){
        const tStr = dateFns.format(t, "yyyy-MM-dd HH:mm:ss");
      }
      endT = new Date();
      data.push({
        "x": "dateFns",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //luxon
      startT = new Date();
      t = luxon.DateTime.now().setZone(this.tz);
      for(let i=0;i<this.count;i++){
        const tStr = t.toFormat("yyyy-MM-dd HH:mm:ss");
      }
      endT = new Date();
      data.push({
        "x": "luxon",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //dayjs
      startT = new Date();
      t = dayjs().tz(this.tz);
      for(let i=0;i<this.count;i++){
        const tStr = t.format("YYYY-MM-DD HH:mm:ss");
      }
      endT = new Date();
      data.push({
        "x": "dayjs",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //js-joda
      startT = new Date();
      const formatter = JSJoda.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
      t = JSJoda.ZonedDateTime.now(JSJoda.ZoneId.of(this.tz));
      for(let i=0;i<this.count;i++){
        const tStr = t.format(formatter);
      }
      endT = new Date();
      data.push({
        "x": "js-joda",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //spacetime
      startT = new Date();
      t = spacetime().goto(this.tz);
      for(let i=0;i<this.count;i++){
        const tStr = t.unixFmt('yyyy-MM-dd HH:mm:ss');
      }
      endT = new Date();
      data.push({
        "x": "spacetime",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //console.log(data);
      const options = {
        chart: {
          type: 'bar'
        },
        title: {
          text: " Test Formating",
        },
        series: [{
          data: data
        }],
        yaxis: {
          title: {
            text: "milliseconds"
          }
        }
      };
      const chart = new ApexCharts(document.querySelector("#testFormating"), options);
      chart.render();
    },
    TestCompare: function(){
      const dateStr = "2022-06-21 18:38:30";
      let data = [];
      let startT,endT;
      let t,t2;
      //moment.js
      startT = new Date();
      t = moment();
      t2 = moment(dateStr);
      for(let i=0;i<this.count;i++){
        const result = t.isBefore(t2);
      }
      endT = new Date();
      data.push({
        "x": "moment",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });
      
      //date-fns (date-fns-tz沒有可用的cdn)
      startT = new Date();
      t = new Date();
      t2 = dateFns.parse(dateStr, "yyyy-MM-dd HH:mm:ss", new Date());
      for(let i=0;i<this.count;i++){
        const result = dateFns.isBefore(t, t2);
      }
      endT = new Date();
      data.push({
        "x": "dateFns",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //luxon
      startT = new Date();
      t = luxon.DateTime.now();
      t2 = luxon.DateTime.fromFormat(dateStr, "yyyy-MM-dd HH:mm:ss");
      for(let i=0;i<this.count;i++){
        const result = t < t2;
      }
      endT = new Date();
      data.push({
        "x": "luxon",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //dayjs
      startT = new Date();
      t = dayjs();
      t2 = dayjs(dateStr);
      for(let i=0;i<this.count;i++){
        const result = t.isBefore(t2);
      }
      endT = new Date();
      data.push({
        "x": "dayjs",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //js-joda
      startT = new Date();
      t = JSJoda.LocalDateTime.now();
      const formatter = JSJoda.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
      t2 = JSJoda.LocalDateTime.parse(dateStr,formatter);
      for(let i=0;i<this.count;i++){
        const result = t.isBefore(t2);
      }
      endT = new Date();
      data.push({
        "x": "js-joda",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //spacetime
      startT = new Date();
      t = spacetime();
      t2 = spacetime(dateStr);
      for(let i=0;i<this.count;i++){
        const result = t.isBefore(t2);
      }
      endT = new Date();
      data.push({
        "x": "spacetime",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //console.log(data);
      const options = {
        chart: {
          type: 'bar'
        },
        title: {
          text: " Test Compare",
        },
        series: [{
          data: data
        }],
        yaxis: {
          title: {
            text: "milliseconds"
          }
        }
      };
      const chart = new ApexCharts(document.querySelector("#testCompare"), options);
      chart.render();
    },
    TestDiff: function(){
      const dateStr = "2022-06-21 18:38:30";
      let data = [];
      let startT,endT;
      let t,t2;
      //moment.js
      startT = new Date();
      t = moment();
      t2 = moment(dateStr);
      for(let i=0;i<this.count;i++){
        const result = t.diff(t2,"hours");
      }
      endT = new Date();
      data.push({
        "x": "moment",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });
      
      //date-fns (date-fns-tz沒有可用的cdn)
      startT = new Date();
      t = new Date();
      t2 = dateFns.parse(dateStr, "yyyy-MM-dd HH:mm:ss", new Date());
      for(let i=0;i<this.count;i++){
        const result = dateFns.differenceInHours(t, t2);
      }
      endT = new Date();
      data.push({
        "x": "dateFns",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //luxon
      startT = new Date();
      t = luxon.DateTime.now();
      t2 = luxon.DateTime.fromFormat(dateStr, "yyyy-MM-dd HH:mm:ss");
      for(let i=0;i<this.count;i++){
        const result = t.diff(t2,"hours");
      }
      endT = new Date();
      data.push({
        "x": "luxon",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //dayjs
      startT = new Date();
      t = dayjs();
      t2 = dayjs(dateStr);
      for(let i=0;i<this.count;i++){
        const result = t.diff(t2,"hour");
      }
      endT = new Date();
      data.push({
        "x": "dayjs",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //js-joda
      startT = new Date();
      t = JSJoda.LocalDateTime.now();
      const formatter = JSJoda.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
      t2 = JSJoda.LocalDateTime.parse(dateStr,formatter);
      for(let i=0;i<this.count;i++){
        const result = t.until(t2, JSJoda.ChronoUnit.HOURS);
      }
      endT = new Date();
      data.push({
        "x": "js-joda",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //spacetime
      startT = new Date();
      t = spacetime();
      t2 = spacetime(dateStr);
      for(let i=0;i<this.count;i++){
        const result = t.diff(t2,"hours");
      }
      endT = new Date();
      data.push({
        "x": "spacetime",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //console.log(data);
      const options = {
        chart: {
          type: 'bar'
        },
        title: {
          text: " Test Diff",
        },
        series: [{
          data: data
        }],
        yaxis: {
          title: {
            text: "milliseconds"
          }
        }
      };
      const chart = new ApexCharts(document.querySelector("#testDiff"), options);
      chart.render();
    },
    TestTransform: function(){
      let data = [];
      let startT,endT;
      let t;
      const h = 2;
      //moment.js
      startT = new Date();
      t = moment();
      for(let i=0;i<this.count;i++){
        const result = t.add(h, "hours");
      }
      endT = new Date();
      data.push({
        "x": "moment",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });
      
      //date-fns (date-fns-tz沒有可用的cdn)
      startT = new Date();
      t = new Date();
      for(let i=0;i<this.count;i++){
        const result = dateFns.addHours(t, h);
      }
      endT = new Date();
      data.push({
        "x": "dateFns",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //luxon
      startT = new Date();
      t = luxon.DateTime.now();
      for(let i=0;i<this.count;i++){
        const result = t.plus({hours: h});
      }
      endT = new Date();
      data.push({
        "x": "luxon",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //dayjs
      startT = new Date();
      t = dayjs();
      for(let i=0;i<this.count;i++){
        const result = t.add(h,"hour");
      }
      endT = new Date();
      data.push({
        "x": "dayjs",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //js-joda
      startT = new Date();
      t = JSJoda.LocalDateTime.now();
      for(let i=0;i<this.count;i++){
        const result = t.plusHours(h);
      }
      endT = new Date();
      data.push({
        "x": "js-joda",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //spacetime
      startT = new Date();
      t = spacetime();
      for(let i=0;i<this.count;i++){
        const result = t.add(h,"hours");
      }
      endT = new Date();
      data.push({
        "x": "spacetime",
        "y": dateFns.differenceInMilliseconds(endT,startT)
      });

      //console.log(data);
      const options = {
        chart: {
          type: 'bar'
        },
        title: {
          text: " Test Transform",
        },
        series: [{
          data: data
        }],
        yaxis: {
          title: {
            text: "milliseconds"
          }
        }
      };
      const chart = new ApexCharts(document.querySelector("#testTransform"), options);
      chart.render();
    }
  }
}).mount("#app");
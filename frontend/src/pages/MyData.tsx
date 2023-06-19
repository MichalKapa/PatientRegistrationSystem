import "../styles/MyData.scss"
import {ChartComponent, Inject, LineSeries, SeriesCollectionDirective, SeriesDirective, Category, Legend,
    DataLabel, Tooltip} from '@syncfusion/ej2-react-charts';
import { registerLicense } from '@syncfusion/ej2-base';
import SwiperComponent from "../components/SwiperComponent"

// Registering Syncfusion license key
registerLicense('Mgo+DSMBaFt+QHJqVEZrW05FckBAXWFKbld8QWJTeltgBShNYlxTR3ZZQ1ljTXpQdUJhX3lc;Mgo+DSMBPh8sVXJ1S0R+XVFPcUBDWXxLflF1VWdTe196cVBWESFaRnZdQV1lSHpTckFgWnhceHNX;ORg4AjUWIQA/Gnt2VFhiQlBEfVhdXGdWfFN0RnNddVpxflBDcC0sT3RfQF5jT39XdkFnWnxZc3RSRA==;MjQxMzUxMEAzMjMxMmUzMDJlMzBIR2N1SFNjc3pBSXUvUDFZaXQwV2VqNUp3MVBNS3l0QkNlUVhtTkkybHQ4PQ==;MjQxMzUxMUAzMjMxMmUzMDJlMzBRa2E0aTlnZkxJK0NvZFdwa3BPcXBtQVJpVUpRb0paR1lEMVl0TUJLNzdzPQ==;NRAiBiAaIQQuGjN/V0d+Xk9FdlRFQmJNYVF2R2BJe1R0dV9DZUwgOX1dQl9gSXhSckVnXXxdd3FRRWI=;MjQxMzUxM0AzMjMxMmUzMDJlMzBRNUVUYjlBM3hlc3B4RFdxZ3JXK0FNT1FGa3IzTUtySEU3UDA0MVpCM1lrPQ==;MjQxMzUxNEAzMjMxMmUzMDJlMzBnSVQyanFkZVp3dEdZVlAyLzdvNDF5U1l4RzJmRzhjbm9aV3V0bHZkaWs4PQ==;Mgo+DSMBMAY9C3t2VFhiQlBEfVhdXGdWfFN0RnNddVpxflBDcC0sT3RfQF5jT39XdkFnWnxZd3RURA==;MjQxMzUxNkAzMjMxMmUzMDJlMzBhVWg0WUF4QjBwR2d5NENpcVZxS1NLTSswWFBVL3BiQW8ySFVLR3FTZnNZPQ==;MjQxMzUxN0AzMjMxMmUzMDJlMzBUYldweGp1RDU3VjExa0R3SGdYR0p3UWN0aUxsbjJkYUwrR1R4NDNSYko4PQ==;MjQxMzUxOEAzMjMxMmUzMDJlMzBRNUVUYjlBM3hlc3B4RFdxZ3JXK0FNT1FGa3IzTUtySEU3UDA0MVpCM1lrPQ==');

function MyData() {

    interface Measurements {
        measurementId: number,
        mass: number,
        temperature: number,
        pressure: string,
        date: string
      }

      interface MeasureData {
        measure: string,
        date: string
      }

    const measurements: Measurements[] = [
        {
            measurementId: 1,
            mass: 100.2,
            temperature: 36.6,
            pressure: '120/70',
            date: "01.02.2021"
        },
        {
            measurementId: 2,
            mass: 90.7,
            temperature: 38,
            pressure: '130/75',
            date: "01.08.2021"
        },
        {
            measurementId: 3,
            mass: 95.5,
            temperature: 37,
            pressure: '110/60',
            date: "01.02.2022"
        },
        {
            measurementId: 4,
            mass: 112,
            temperature: 36.6,
            pressure: '100/70',
            date: "01.08.2022"
        },
        {
            measurementId: 5,
            mass: 120,
            temperature: 39.5,
            pressure: '150/100',
            date: "01.02.2023"
        },
    ]

    let weightData: MeasureData[] = []
    let temperatureData: MeasureData[] = []
    let pressureData1: MeasureData[] = []
    let pressureData2: MeasureData[] = []

    measurements.forEach((measurement) => {
        weightData.push({ measure: measurement.mass.toString(), date: measurement.date });
        temperatureData.push({ measure: measurement.temperature.toString(), date: measurement.date });
        pressureData1.push({ measure: measurement.pressure.split("/")[0], date: measurement.date });
        pressureData2.push({ measure: measurement.pressure.split("/")[1], date: measurement.date });
      });

    // const currentDate = new Date();
    // const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    // const formattedDate = currentDate.toLocaleDateString('pl-PL', {day: '2-digit', month: '2-digit', year: '2-digit'});

    let charts = [
        (<ChartComponent
            title="Waga w kg"
            primaryXAxis={{ valueType: "Category" }}
            legendSettings={{ visible: true }}
        >
            <Inject
            services={[LineSeries, Category, Legend, DataLabel, Tooltip]}
            />
            <SeriesCollectionDirective>
                <SeriesDirective
                    type="Line"
                    dataSource={weightData}
                    xName="date"
                    yName="measure"
                    marker={{ dataLabel: { visible: true }, visible: true }}
                ></SeriesDirective>
            </SeriesCollectionDirective>
        </ChartComponent>),
        
        (<ChartComponent
            title="Temperatura w stopniach Celsjusza"
            primaryXAxis={{ valueType: "Category" }}
            legendSettings={{ visible: true }}
        >
            <Inject
            services={[LineSeries, Category, Legend, DataLabel, Tooltip]}
            />
            <SeriesCollectionDirective>
                <SeriesDirective
                    type="Line"
                    dataSource={temperatureData}
                    xName="date"
                    yName="measure"
                    marker={{ dataLabel: { visible: true }, visible: true }}
                ></SeriesDirective>
            </SeriesCollectionDirective>
        </ChartComponent>),

        (<ChartComponent
            title="Ciśnienie w mmHg"
            primaryXAxis={{ valueType: "Category" }}
            legendSettings={{ visible: true }}
        >
            <Inject
            services={[LineSeries, Category, Legend, DataLabel, Tooltip]}
            />
            <SeriesCollectionDirective>
                <SeriesDirective
                    type="Line"
                    dataSource={pressureData1}
                    xName="date"
                    yName="measure"
                    marker={{ dataLabel: { visible: true }, visible: true }}
                ></SeriesDirective>
                <SeriesDirective
                    type="Line"
                    dataSource={pressureData2}
                    xName="date"
                    yName="measure"
                    marker={{ dataLabel: { visible: true }, visible: true }}
                ></SeriesDirective>
            </SeriesCollectionDirective>
        </ChartComponent>),

      ]

    return (
        <div id="my_data_page">
      <div className="center_column">
        <a href="/my/data/new" className="buttons">WPROWADŹ NOWE POMIARY</a>
      </div>
      <SwiperComponent elements={charts}/>
      
    </div>
    )
}

export default MyData;
import React, { useEffect, useState } from "react";
import { Card, CardBody, Col } from "reactstrap";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import API from "../../../services";

function ChartCategory() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get(`dashboard/total-seen-share`).then((result) => {
      if (result.message === "success") {
        setData(result.data);
      }
    });
  }, []);

  return (
    <Col md={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Recap Category</h5>
          </div>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category_name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                name="Seen"
                type="monotone"
                dataKey="total_seen"
                fill="#70bbfd"
                stroke="#70bbfd"
                fillOpacity={0.2}
              />
              <Bar
                name="Share"
                type="monotone"
                dataKey="total_share"
                fill="#4ce1b6"
                stroke="#4ce1b6"
                fillOpacity={0.2}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </Col>
  );
}

export default ChartCategory;

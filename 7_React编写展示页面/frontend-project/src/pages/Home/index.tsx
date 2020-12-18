import { Button, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import ReactEcharts from "echarts-for-react";
import { IResponse } from "../../interface";
import "./index.css";
import moment from "moment";

interface CourseItem {
  title: string;
  counter: number;
}

interface LineData {
  name: string;
  type: string;
  data: number[];
}

interface IData {
  [key: string]: CourseItem[];
}

type BooleanResponse = IResponse<boolean>;

type DataResponse = IResponse<IData>;

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const Home: React.FC = () => {
  const [data, setData] = useState({} as IData);
  const [isLogin, setIslogin] = useState(true);
  const [isLoaded, setIsloaded] = useState(true);

  useEffect(() => {
    checkLogin();
    showData();
  }, []);

  async function checkLogin() {
    await axios
      .get("/api/isLogin", {
        cancelToken: source.token,
      })
      .then((res: AxiosResponse<BooleanResponse>) => {
        setIslogin(res.data.data);
        setIsloaded(false);
      });
  }

  async function showData() {
    await axios
      .get("/api/showData", {
        cancelToken: source.token,
      })
      .then((res: AxiosResponse<DataResponse>) => {
        if (res.data.result) {
          setData(res.data.data);
        } else {
          message.error(res.data.errMsg);
        }
      });
  }

  const logout = () => {
    axios.get("/api/logout").then((res: AxiosResponse<BooleanResponse>) => {
      if (res.data.result) {
        setIslogin(false);
      }
    });
  };

  const crowller = () => {
    setIsloaded(true);
    axios.get("/api/getData").then((res: AxiosResponse<BooleanResponse>) => {
      setIsloaded(false);
      if (res.data.result) {
        message.success("爬取数据成功！");
      } else {
        message.success("爬取数据失败！");
        console.log(res.data.errMsg);
      }
    });
  };

  const refresh = () => {
    showData();
  };

  const getEchartsOption: () => echarts.EChartOption = () => {
    const courseNames: string[] = [];
    const times: string[] = [];
    const tempData: {
      [key: string]: number[];
    } = {};
    for (let i in data) {
      const item = data[i];
      times.push(moment(Number(i)).format("MM-DD HH:mm"));
      item.forEach((innerItem) => {
        const { title, counter } = innerItem;
        if (courseNames.indexOf(title) === -1) {
          courseNames.push(title);
        }
        tempData[title]
          ? tempData[title].push(counter)
          : (tempData[title] = [counter]);
      });
    }
    const result: LineData[] = [];
    for (let i in tempData) {
      result.push({
        name: i,
        type: "line",
        data: tempData[i],
      });
    }
    return {
      title: {
        text: "课程在线学习人数",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: courseNames,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: times,
      },
      yAxis: {
        type: "value",
      },
      series: result,
    };
  };

  return (
    <div className="home-page">
      <Spin spinning={isLoaded}>
        {isLogin ? (
          <>
            <div className="home-btns">
              <Button
                type="primary"
                style={{ marginRight: "25px" }}
                onClick={crowller}
              >
                爬取
              </Button>
              <Button
                type="primary"
                style={{ marginRight: "25px" }}
                onClick={refresh}
              >
                刷新数据
              </Button>
              <Button type="primary" onClick={logout}>
                退出
              </Button>
            </div>
            <ReactEcharts option={getEchartsOption()} />;
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </Spin>
    </div>
  );
};

export default Home;

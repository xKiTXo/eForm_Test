import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { Tabs, Tab, InputGroup, FormControl, Button, Form, Col, Row, Table, Modal } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker } from 'rsuite';
import SignatureCanvas from 'react-signature-canvas'

import "../styles/components/EFormComponent.scss";
const EFormComponent = () => {

    const sigCanvasRef = useRef(null);

    const [activeTab, setActiveTab] = useState(1);

    const handleTabSelect = (selectedTab) => {
        setActiveTab(selectedTab);
    };

    const tabNames = [
        '工作前安全會議',
        '危害識別活動記錄及每日檢查表',
        '每日工地檢查表',
        '安全施工檢討記錄',
        'CPDAS'
    ];

    const handleFormPage = (tabName) => {
        switch (tabName) {
            case tabNames[0]: {
                return tab1();
            }
            case tabNames[1]: {
                return tab2();
            }
            case tabNames[2]: {
                return tab3();
            }
            case tabNames[3]: {
                return tab4();
            }
            case tabNames[4]: {
                return tab5();
            }

        }
    };



    const onSubmit = (data) => {
        console.log(data);

    };



    const { register: registerTab1, handleSubmit: handleSubmitTab1, control: controlTab1, getValues: getValuesTab1 } = useForm();
    const [options, setOptions] = useState(["", "HIK", "FTA", "MCV"]);
    const tab1 = () => {
        return (
            <form onSubmit={handleSubmitTab1(onSubmit)}>
                <Button type='submit'>Submit</Button>
                <div>
                    <h1>合格人員 – 工作前安全會議</h1>
                    <Row>
                        <Col xs={6} md={4}>
                            <Form.Label>查詢預設工作類別</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="查詢預設工作類別"
                                    aria-label="查詢預設工作類別"
                                    aria-describedby="basic-addon2"
                                    {...registerTab1("workType")}
                                />
                                <Button variant="outline-secondary" id="button-addon2">
                                    搜尋
                                </Button>
                            </InputGroup>
                        </Col>

                        <Col xs={6} md={4}>
                            <Form.Group controlId="formWorkCategory">
                                <Form.Label>工作類別</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="工作類別"
                                    {...registerTab1("workCategory")}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={6} md={4}>
                            <Form.Group controlId="formQualifiedPerson">
                                <Form.Label>合格人員</Form.Label>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="合格人員"
                                        {...registerTab1("qualifiedPerson")}
                                    />
                                    <Button variant="outline-secondary" id="button-addon2">
                                        搜尋
                                    </Button>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col xs={6} md={4}>
                            <Form.Group controlId="formWorkLocation">
                                <Form.Label>工作地點</Form.Label>
                                <Form.Select {...registerTab1("workLocation")}>
                                    {options.map((option, index) => (
                                        <option key={option + index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xs={6} md={4}>
                            <Form.Group controlId="formDate">
                                <Form.Label>日期</Form.Label>
                                <Form.Control
                                    as={() => <Controller
                                        name='date'
                                        control={controlTab1}
                                        render={({ field }) => (
                                            <Col>
                                                <DatePicker
                                                    type="date"
                                                    placeholder="日期"
                                                    format="yyyy/MM/dd"
                                                    style={{ width: '100%' }}
                                                    defaultValue={new Date()}
                                                    oneTap
                                                    {...field}
                                                />
                                            </Col>
                                        )}
                                    />}
                                >
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={6} md={4}>
                            <Form.Group controlId="formMeetingTime">
                                <Form.Label>安全會議時間</Form.Label>
                                <Form.Control
                                    type="time"
                                    placeholder="安全會議時間"
                                    {...registerTab1("meetingTime")}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={6} md={4}>
                            <Form.Group controlId="formEngineeringScope">
                                <Form.Label>工程領域範圍</Form.Label>
                                <Form.Select
                                    {...registerTab1("engineeringScope")}
                                >
                                    <option value=""></option>
                                    <option value="是">是</option>
                                    <option value="否">否</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col xs={6} md={4}>
                            <Form.Group controlId="formWO">
                                <Form.Label>WO 編號</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="WO 編號"
                                    {...registerTab1("woNumber")}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={6} md={4}>
                            <Form.Group controlId="formEnterTime">
                                <Form.Label>進入軌道時間</Form.Label>
                                <Form.Control
                                    type="time"
                                    placeholder="進入軌道時間"
                                    {...registerTab1("enterTime")}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={6} md={4}>
                            <Form.Group controlId="formTN">
                                <Form.Label>TN/ETMS 編號</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="TN/ETMS 編號"
                                    {...registerTab1("tnNumber")}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Label>
                        會議項目<span style={{ paddingLeft: "3rem" }}></span>
                        選出下列適用項目並提醒員工注意 (所有要點提示必須填寫)
                    </Form.Label>

                    <Row>
                        <Col xs={12}>
                            <Form.Group controlId="formValidDocuments">
                                <Form.Label>1. 有效證件</Form.Label>
                                <Row>
                                    <Col xs={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="建造業安全訓練證明書(平安卡)"
                                            {...registerTab1("validDocuments1")}
                                        />
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="建造業工人註冊證"
                                            {...registerTab1("validDocuments2")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>


                        {/* 
                                    Add new Section, title is "2. 工作環境", have 5 parts
                                    part 1. Checkbox list. all checkbox columns are row line, create new line per 3 columns in a row,
                                    last checkbox is "其他:" and input text in one line
                                    checkbox list is below setting:
                                    1. 軌道上或附近
                                    2. 架空電線上或附近
                                    3. 電力裝置
                                    4. 帶電導體上或附近
                                    5. 密閉空間
                                    6. 挖掘工程
                                    7. 狹窄空間
                                    8. 高空工作
                                    9. 酷熱環境
                                    10. 空氣污染
                                    11. 交通車輛
                                */}

                        <Col xs={12}>
                            <Form.Group controlId="formWorkEnvironment">
                                <Form.Label>2. 工作環境</Form.Label>
                                <Row>
                                    <Col xs={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="軌道上或附近"
                                            {...registerTab1("workEnvironmentTrack")}
                                        />
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="架空電線上或附近"
                                            {...registerTab1("workEnvironmentOverheadWire")}
                                        />
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="電力裝置"
                                            {...registerTab1("workEnvironmentPowerDevice")}
                                        />
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="帶電導體上或附近"
                                            {...registerTab1("workEnvironmentChargedConductor")}
                                        />
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="密閉空間"
                                            {...registerTab1("workEnvironmentConfinedSpace")}
                                        />
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="挖掘工程"
                                            {...registerTab1("workEnvironmentExcavation")}
                                        />
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="狹窄空間"
                                            {...registerTab1("workEnvironmentNarrowSpace")}
                                        />
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="高空工作"
                                            {...registerTab1("workEnvironmentHighAltitude")}
                                        />
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="酷熱環境"
                                            {...registerTab1("workEnvironmentHotEnvironment")}
                                        />
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="空氣污染"
                                            {...registerTab1("workEnvironmentAirPollution")}
                                        />
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="交通車輛"
                                            {...registerTab1("workEnvironmentVehicles")}
                                        />
                                    </Col>
                                    <Col xs={12}>
                                        <Form.Label>其他:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="其他"
                                            {...registerTab1("workEnvironmentOther")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>


                        {/* 
                            Part 2. title is "隱患/風險" is checkbox list. 
                            all checkbox columns are row line, create new line per 3 columns in a row,
                            last checkbox is "其他:" and input text in one line
                            checkbox list is below setting:
                            1. 照明不足
                            2. 通風欠佳
                            3. 地面濕滑
                            4. 地面不平/斜路
                            5. 阻礙物
                            6. 隙縫(裂口)
                            7. 墮下
                            8. 缺氧
                            9. 中暑
                            10. 電器設備跳火
                            11. 觸電/漏電
                        */}

                        <Col>
                            <Form.Group controlId="formHiddenDanger">
                                <Form.Label>隱患/風險</Form.Label>
                                <Row>
                                    <Col xs={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="照明不足"
                                            {...registerTab1("hiddenDangerInsufficientLighting")}
                                        />
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="通風欠佳"
                                            {...registerTab1("hiddenDangerPoorVentilation")}
                                        />
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="地面濕滑"
                                            {...registerTab1("hiddenDangerSlipperyGround")}
                                        />
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="地面不平/斜路"
                                            {...registerTab1("hiddenDangerUnevenGround")}
                                        />
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="阻礙物"
                                            {...registerTab1("hiddenDangerObstacle")}
                                        />
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="隙縫(裂口)"
                                            {...registerTab1("hiddenDangerCrack")}
                                        />
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="墮下"
                                            {...registerTab1("hiddenDangerFall")}
                                        />
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="缺氧"
                                            {...registerTab1("hiddenDangerOxygenDeficiency")}
                                        />
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="中暑"
                                            {...registerTab1("hiddenDangerHeatStroke")}
                                        />
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="電器設備跳火"
                                            {...registerTab1("hiddenDangerElectricalEquipmentFire")}
                                        />
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="觸電/漏電"
                                            {...registerTab1("hiddenDangerElectricShock")}
                                        />
                                    </Col>
                                    <Col xs={12}>
                                        <Form.Label>其他:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="其他"
                                            {...registerTab1("hiddenDangerOther")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        {/* 
                            Part 3. title is "滑倒、絆倒、跌倒交通/黑點" 
                            input element, has checkbox name is "不適用" at right of input element,
                            input element is disabled when checkbox is checked
                        */}
                        <Col xs={12}>
                            <Form.Group controlId="formSlipTripFall">
                                <Form.Label>滑倒、絆倒、跌倒交通/黑點</Form.Label>
                                <Row>
                                    <Col xs={8} lg={6}>
                                        <Form.Control
                                            type="text"
                                            placeholder="滑倒、絆倒、跌倒交通/黑點"
                                            {...registerTab1("slipTripFall")}
                                        />
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="不適用"
                                            {...registerTab1("slipTripFallNA")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>


                        {/* 
                            title is "控制措施", input element.
                            title is "要點提示", input element.
                        */}
                        <Col xs={12}>
                            <Form.Group controlId="formcontrolTab1Measures">
                                <Form.Label>控制措施</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="控制措施"
                                    {...registerTab1("controlTab1Measures")}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group controlId="formKeyPoints">
                                <Form.Label>要點提示</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="要點提示"
                                    {...registerTab1("keyPoints")}
                                />
                            </Form.Group>
                        </Col>
                        {/* 
                            title is "3.天氣",
                            checkbox row list, per line 4 columns
                            list item:
                            正常
                            烈日
                            暴雨
                            勁風 
                            雷暴
                            颱風
                            酷熱
                            低溫
                        */}
                        <Col xs={12}>
                            <Form.Group controlId="formWeather">
                                <Form.Label>3.天氣</Form.Label>
                                <Row>
                                    <Col xs={6} md={3}>
                                        <Form.Check
                                            type="checkbox"
                                            label="正常"
                                            {...registerTab1("weatherNormal")}
                                        />
                                    </Col>
                                    <Col xs={6} md={3}>
                                        <Form.Check
                                            type="checkbox"
                                            label="烈日"
                                            {...registerTab1("weatherSun")}
                                        />
                                    </Col>
                                    <Col xs={6} md={3}>
                                        <Form.Check
                                            type="checkbox"
                                            label="暴雨"
                                            {...registerTab1("weatherRain")}
                                        />
                                    </Col>
                                    <Col xs={6} md={3}>
                                        <Form.Check
                                            type="checkbox"
                                            label="勁風"
                                            {...registerTab1("weatherStrongWind")}
                                        />
                                    </Col>
                                    <Col xs={6} md={3}>
                                        <Form.Check
                                            type="checkbox"
                                            label="雷暴"
                                            {...registerTab1("weatherThunderstorm")}
                                        />
                                    </Col>
                                    <Col xs={6} md={3}>
                                        <Form.Check
                                            type="checkbox"
                                            label="颱風"
                                            {...registerTab1("weatherTyphoon")}
                                        />
                                    </Col>
                                    <Col xs={6} md={3}>
                                        <Form.Check
                                            type="checkbox"
                                            label="酷熱"
                                            {...registerTab1("weatherHot")}
                                        />
                                    </Col>
                                    <Col xs={6} md={3}>
                                        <Form.Check
                                            type="checkbox"
                                            label="低溫"
                                            {...registerTab1("weatherCold")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        {/* 
                            title is "保護措施", input element.
                            title is "要點提示", input element.
                        */}

                        <Col xs={12}>
                            <Form.Group controlId="formProtectionMeasures">
                                <Form.Label>保護措施</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="保護措施"
                                    {...registerTab1("protectionMeasures")}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group controlId="formKeyPoints">
                                <Form.Label>要點提示</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="要點提示"
                                    {...registerTab1("keyPoints")}
                                />
                            </Form.Group>
                        </Col>
                        {/* 
                            title is "4.保護措施及安全文件"
                            checkbox row list, per line 4 columns
                            list item:
                            工程領域
                            軌道車輛運行安排
                            軌道上或附近工作
                            非工程領域
                            行車時間
                            非行車時間
                            非軌道上或附近工作
                        */}
                        <Col xs={12}>
                            <Form.Group controlId="formProtectionMeasuresAndSafetyDocuments">
                                <Form.Label>4.保護措施及安全文件</Form.Label>
                                <Row>
                                    <Col xs={6} md={3}>
                                        <Form.Check
                                            type="checkbox"
                                            label="工程領域"
                                            {...registerTab1("protectionMeasuresEngineeringScope")}
                                        />
                                    </Col>
                                    <Col xs={6} md={3}>
                                        <Form.Check
                                            type="checkbox"
                                            label="軌道車輛運行安排"
                                            {...registerTab1("protectionMeasuresTrackVehicleArrangement")}
                                        />
                                    </Col>
                                    <Col xs={6} md={3}>
                                        <Form.Check
                                            type="checkbox"
                                            label="軌道上或附近工作"
                                            {...registerTab1("protectionMeasuresTrackWork")}
                                        />
                                    </Col>
                                    <Col xs={6} md={3}>
                                        <Form.Check
                                            type="checkbox"
                                            label="非工程領域"
                                            {...registerTab1("protectionMeasuresNonEngineeringScope")}
                                        />
                                    </Col>
                                    <Col xs={6} md={3}>
                                        <Form.Check
                                            type="checkbox"
                                            label="行車時間"
                                            {...registerTab1("protectionMeasuresDrivingTime")}
                                        />
                                    </Col>
                                    <Col xs={6} md={3}>
                                        <Form.Check
                                            type="checkbox"
                                            label="非行車時間"
                                            {...registerTab1("protectionMeasuresNonDrivingTime")}
                                        />
                                    </Col>
                                    <Col xs={6} md={3}>
                                        <Form.Check
                                            type="checkbox"
                                            label="非軌道上或附近工作"
                                            {...registerTab1("protectionMeasuresNonTrackWork")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>


                        {/* 
                            title is "保護措施"
                            checkbox row list, per line 4 columns
                            list item:
                            路軌夾 手提燈/信號燈 號角+燈/旗 止輪器 圍欄
                            密閉空間器具 
                            checkbox has input text in one line below:
                            其他： 紅閃燈位置： 接地棒位置：
                        */}
                        <Col xs={12}>
                            <Form.Group controlId="formProtectionMeasures">
                                <Form.Label>保護措施</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="路軌夾"
                                            {...registerTab1("protectionMeasuresTrackClamp")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="手提燈/信號燈"
                                            {...registerTab1("protectionMeasuresHandLamp")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="號角+燈/旗"
                                            {...registerTab1("protectionMeasuresHorn")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="止輪器"
                                            {...registerTab1("protectionMeasuresWheelStopper")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="圍欄"
                                            {...registerTab1("protectionMeasuresFence")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="密閉空間器具"
                                            {...registerTab1("protectionMeasuresConfinedSpace")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>其他：</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="其他"
                                            {...registerTab1("protectionMeasuresOther")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>紅閃燈位置：</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="紅閃燈位置"
                                            {...registerTab1("protectionMeasuresRedLightPosition")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>接地棒位置：</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="接地棒位置"
                                            {...registerTab1("protectionMeasuresGroundingRodPosition")}
                                        />
                                    </Col>
                                    {/*  接地棒位置： has checkbox name is "不適用" at right of input element */}
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="不適用"
                                            {...registerTab1("protectionMeasuresGroundingRodPositionNA")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* 
                    title is "安全文件"
                    checkbox row list, per line 4 columns
                    list item:
                    工作許可證 PTW
                    電路隔離證書 CIC 
                    試驗許可證SFT
                    工作範圍限制證 LOA
                    工作證書(密閉空間)CFW(CS)
                    IRF 隔電紀錄
                    Form 5 金屬棚架
                    電力安全評估表格(15B)
                    不適用
                */}
                    <Row>
                        <Col>
                            <Form.Group controlId="formSafetyDocuments">
                                <Form.Label>安全文件</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="工作許可證 PTW"
                                            {...registerTab1("safetyDocumentsPTW")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="電路隔離證書 CIC"
                                            {...registerTab1("safetyDocumentsCIC")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="試驗許可證SFT"
                                            {...registerTab1("safetyDocumentsSFT")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="工作範圍限制證 LOA"
                                            {...registerTab1("safetyDocumentsLOA")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="工作證書(密閉空間)CFW(CS)"
                                            {...registerTab1("safetyDocumentsCFW")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="IRF 隔電紀錄"
                                            {...registerTab1("safetyDocumentsIRF")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="Form 5 金屬棚架"
                                            {...registerTab1("safetyDocumentsForm5")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="電力安全評估表格(15B)"
                                            {...registerTab1("safetyDocuments15B")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="不適用"
                                            {...registerTab1("safetyDocumentsNA")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>
                    {/* 
                    title is "5. 涉及工作內容的風險",
                    checkbox, name is "簡述工作危害(HIA), 如： 高空工作、人力提舉、危險品處理、壓力仔樽處理等".
                    input element, name is "要點提示"
                */}
                    <Row>
                        <Col>
                            <Form.Group controlId="formRiskContent">
                                <Form.Label>5. 涉及工作內容的風險</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="簡述工作危害(HIA), 如： 高空工作、人力提舉、危險品處理、壓力仔樽處理等"
                                            {...registerTab1("riskContent")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>要點提示</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="要點提示"
                                            {...registerTab1("keyPoints")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* 
                    title is "6. 個人保護裝備"
                    checkbox row list, per line 4 columns
                    list item:
                    安全鞋 螢光衣 安全帽 安全帽- 下頜帶 護目鏡
                    口罩 雨衣 安全帶 保護手套
                    耳罩/耳塞
                    高壓絕緣手套
                    安全水鞋 電筒 防電弧保護服 
                    其他： (with input element).
                    Also, input element, name is "要點提示"
                */}
                    <Row>
                        <Col>
                            <Form.Group controlId="formPPE">
                                <Form.Label>6. 個人保護裝備</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="安全鞋"
                                            {...registerTab1("ppeSafetyShoes")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="螢光衣"
                                            {...registerTab1("ppeFluorescentClothes")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="安全帽"
                                            {...registerTab1("ppeSafetyHat")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="安全帽- 下頜帶"
                                            {...registerTab1("ppeSafetyHatChinStrap")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="護目鏡"
                                            {...registerTab1("ppeGoggles")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="口罩"
                                            {...registerTab1("ppeMask")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="雨衣"
                                            {...registerTab1("ppeRaincoat")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="安全帶"
                                            {...registerTab1("ppeSafetyBelt")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="保護手套"
                                            {...registerTab1("ppeProtectiveGloves")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="耳罩/耳塞"
                                            {...registerTab1("ppeEarMuffs")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="高壓絕緣手套"
                                            {...registerTab1("ppeHighVoltageInsulationGloves")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="安全水鞋"
                                            {...registerTab1("ppeSafetyWaterShoes")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="電筒"
                                            {...registerTab1("ppeFlashlight")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="防電弧保護服"
                                            {...registerTab1("ppeArcProtectionSuit")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>其他：</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="其他"
                                            {...registerTab1("ppeOther")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>要點提示</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="要點提示"
                                            {...registerTab1("keyPoints")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* 
                    title is "7. 應急安排"
                    checkbox row list, per line 3 columns
                    list item:
                    召集緊急支援 進出工地路線 逃生路線 滅火筒位置 急救箱
                    Also, input element, name is "要點提示"
                */}
                    <Row>
                        <Col>
                            <Form.Group controlId="formEmergencyArrangement">
                                <Form.Label>7. 應急安排</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="召集緊急支援"
                                            {...registerTab1("emergencyArrangementEmergencySupport")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="進出工地路線"
                                            {...registerTab1("emergencyArrangementSiteAccessRoute")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="逃生路線"
                                            {...registerTab1("emergencyArrangementEscapeRoute")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="滅火筒位置"
                                            {...registerTab1("emergencyArrangementFireExtinguisherPosition")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="急救箱"
                                            {...registerTab1("emergencyArrangementFirstAidKit")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>要點提示</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="要點提示"
                                            {...registerTab1("keyPoints")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>


                    {/* 
                    title is "8. 單獨工作"
                    checkbox row list, per line 1 columns
                    list item:
                    簡述及清楚了解 「 單獨工作的安全指引 」卡的安全指引
                    觀察四周環境以辨識潛在風險
                    與上司或有關人士保持聯絡(如出入工地，開始及完成工作)
                    不適用
                    Also, input element, name is "要點提示"
                */}
                    <Row>
                        <Col>
                            <Form.Group controlId="formAloneWork">
                                <Form.Label>8. 單獨工作</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="簡述及清楚了解 「 單獨工作的安全指引 」卡的安全指引"
                                            {...registerTab1("aloneWork")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="觀察四周環境以辨識潛在風險"
                                            {...registerTab1("aloneWorkObserve")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="與上司或有關人士保持聯絡(如出入工地，開始及完成工作)"
                                            {...registerTab1("aloneWorkContact")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="不適用"
                                            {...registerTab1("aloneWorkNA")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>要點提示</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="要點提示"
                                            {...registerTab1("keyPoints")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>


                    {/* 
                    title is "9. 環境影響"
                    checkbox row list, per line 3 columns
                    list item:
                    噪音 
                    符合 「 建築噪音許可證 」 要求 
                    利用相關的 「 消滅噪音措施查核表 」 完成核實
                    化學廢料 
                    燈光滋擾
                    不適用
                    Also, input element, name is "要點提示"
                */}
                    <Row>
                        <Col>
                            <Form.Group controlId="formEnvironmentalImpact">
                                <Form.Label>9. 環境影響</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="噪音"
                                            {...registerTab1("environmentalImpactNoise")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="符合 「 建築噪音許可證 」 要求"
                                            {...registerTab1("environmentalImpactNoisePermit")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="利用相關的 「 消滅噪音措施查核表 」 完成核實"
                                            {...registerTab1("environmentalImpactNoiseChecklist")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="化學廢料"
                                            {...registerTab1("environmentalImpactChemicalWaste")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="燈光滋擾"
                                            {...registerTab1("environmentalImpactLightDisturbance")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="不適用"
                                            {...registerTab1("environmentalImpactNA")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>要點提示</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="要點提示"
                                            {...registerTab1("keyPoints")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>


                    {/* 
                    title is "10. 其他注意事項"
                    checkbox row list, per line 3 columns
                    list item:
                    簡述工作 
                    安全駕駛及提點 (路軌車) 
                    危險物料 
                    工具/設備： (with input element)
                    Also, input element, name is "要點提示"
                */}
                    <Row>
                        <Col>
                            <Form.Group controlId="formOtherNotes">
                                <Form.Label>10. 其他注意事項</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="簡述工作"
                                            {...registerTab1("otherNotesWork")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="安全駕駛及提點 (路軌車)"
                                            {...registerTab1("otherNotesSafeDriving")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="危險物料"
                                            {...registerTab1("otherNotesDangerousMaterials")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>工具/設備：</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="工具/設備"
                                            {...registerTab1("otherNotesTools")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>要點提示</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="要點提示"
                                            {...registerTab1("keyPoints")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* 
                    title is "11. 負責人聯絡方法", have 3 line 
                    line 1: have 4 columns, list item: 
                    input element, name is 姓名 
                    select element, name is 角色 , options list: CP, CP&WPIC, WPIC, Mento
                    input element, name is 電話/ 手提電話 
                    input element, name is 無線電對講機 call sign
                */}
                    <Row>
                        <Col>
                            <Form.Group controlId="formContactMethod">
                                <Form.Label>11. 負責人聯絡方法</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="姓名"
                                            {...registerTab1("contactName")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control as="select" {...registerTab1("contactRole")}>
                                            <option value="CP">CP</option>
                                            <option value="WPIC">WPIC</option>
                                            <option value="CPandWPIC">CP&WPIC</option>
                                            <option value="Mento">Mento</option>
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="電話/ 手提電話"
                                            {...registerTab1("contactPhone")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="無線電對講機 call sign"
                                            {...registerTab1("contactRadioCallSign")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* 
                    line 2: have 4 columns, list item:
                    input element with right button (search icon), name is 姓名 , 
                    select element, name is 角色 , options list: CP, CP&WPIC, WPIC, Mento
                    input element, name is 電話/ 手提電話 
                    input element, name is 無線電對講機 call sign
                */}
                    <Row>
                        <Col>
                            <Form.Group controlId="formContactMethod">
                                <Row>
                                    <Col>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                placeholder="姓名"
                                                {...registerTab1("contactName")}
                                            />
                                            <Button variant="outline-secondary" id="button-addon3">
                                                搜尋
                                            </Button>
                                        </InputGroup>
                                    </Col>
                                    <Col>
                                        <Form.Control as="select" {...registerTab1("contactRole")}>
                                            <option value="CP">CP</option>
                                            <option value="WPIC">WPIC</option>
                                            <option value="CPandWPIC">CP&WPIC</option>
                                            <option value="Mento">Mento</option>
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="電話/ 手提電話"
                                            {...registerTab1("contactPhone")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="無線電對講機 call sign"
                                            {...registerTab1("contactRadioCallSign")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>
                    {/* 
                    line 3: have 4 columns, list item: 
                    input element, name is 姓名 
                    select element, name is 角色 , options list: CP, CP&WPIC, WPIC, Mento
                    input element, name is 電話/ 手提電話 
                    input element, name is 無線電對講機 call sign
                */}
                    <Row>
                        <Col>
                            <Form.Group controlId="formContactMethod">
                                <Row>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="姓名"
                                            {...registerTab1("contactName")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control as="select" {...registerTab1("contactRole")}>
                                            <option value="CP">CP</option>
                                            <option value="WPIC">WPIC</option>
                                            <option value="CPandWPIC">CP&WPIC</option>
                                            <option value="Mento">Mento</option>
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="電話/ 手提電話"
                                            {...registerTab1("contactPhone")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="無線電對講機 call sign"
                                            {...registerTab1("contactRadioCallSign")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* 
                    title is "12. 工前熱身"
                    checkbox row list, per line 3 columns
                    list item: 
                    有 (with input element, name is "地點:")
                    沒有 (with input element, name is "原因:")
                */}
                    <Row>
                        <Col>
                            <Form.Group controlId="formWarmUp">
                                <Form.Label>12. 工前熱身</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="有"
                                            {...registerTab1("warmUp")}
                                        />
                                        <Form.Control
                                            type="text"
                                            placeholder="地點"
                                            {...registerTab1("warmUpLocation")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="沒有"
                                            {...registerTab1("warmUpNA")}
                                        />
                                        <Form.Control
                                            type="text"
                                            placeholder="原因"
                                            {...registerTab1("warmUpReason")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* 
                    title is "13. 改變控制"
                    row list, per line 1 columns
                    list item: 
                    select element, name is "工作環境改變：", options list: "", 是, 否
                    input element, name is "對安全/隱患/風險的改變:"
                    input element, name is "應變行動:"
                */}
                    <Row>
                        <Col>
                            <Form.Group controlId="formChangecontrolTab1">
                                <Form.Label>13. 改變控制</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Control as="select" {...registerTab1("changecontrolTab1Environment")}>
                                            <option value=""> </option>
                                            <option value="yes">是</option>
                                            <option value="no">否</option>
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="對安全/隱患/風險的改變"
                                            {...registerTab1("changecontrolTab1Change")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="應變行動"
                                            {...registerTab1("changecontrolTab1Action")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* 
                    title is "14. 運送濕物料"
                    checkbox row list, per line 1 columns
                    list item: 
                    如須搬運濕的物料 / 塵網，須使同合適之器皿盛載，防止滴水引起之意外
                    不適用
                */}
                    <Row>
                        <Col>
                            <Form.Group controlId="formTransportWetMaterial">
                                <Form.Label>14. 運送濕物料</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="如須搬運濕的物料 / 塵網，須使同合適之器皿盛載，防止滴水引起之意外"
                                            {...registerTab1("transportWetMaterial")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="不適用"
                                            {...registerTab1("transportWetMaterialNA")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* 
                    title is "15. 檢查梯具"
                    checkbox row list, per line 1 columns
                    list item: 
                    如須使用梯具，使用前必須檢查梯具處於良好狀況
                    檢查冇過期
                    不適用
                */}
                    <Row>
                        <Col>
                            <Form.Group controlId="formCheckLadder">
                                <Form.Label>15. 檢查梯具</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="如須使用梯具，使用前必須檢查梯具處於良好狀況"
                                            {...registerTab1("checkLadder")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="檢查冇過期"
                                            {...registerTab1("checkLadderExpired")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="不適用"
                                            {...registerTab1("checkLadderNA")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* 
                    title is "16. 搬運工具"
                    checkbox row list, per line 1 columns
                    list item: 
                    通報站長須搬運工具或物料
                    如須使用扶手梯搬運，須確保扶手梯於非運作中
                    不適用
                */}
                    <Row>
                        <Col>
                            <Form.Group controlId="formTransportTool">
                                <Form.Label>16. 搬運工具</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="通報站長須搬運工具或物料"
                                            {...registerTab1("transportTool")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="如須使用扶手梯搬運，須確保扶手梯於非運作中"
                                            {...registerTab1("transportToolLadder")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="不適用"
                                            {...registerTab1("transportToolNA")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* 
                    title is "17. 完工前確認"
                    checkbox row list, per line 1 columns
                    list item: 
                    工作指引(WI)或其他相關的工作表(請註明):
                    移除紅閃燈時間: (with Datepicker element, type is time)
                    CPDAS 
                    離開時間: (with Datepicker element, type is time)
                    每日工地檢查表 
                    安全施工檢討記錄
                    路軌清潔檢查表
                    路軌使用檢查表
                */}
                    <Row>
                        <Col>
                            <Form.Group controlId="formConfirmationBeforeCompletion">
                                <Form.Label>17. 完工前確認</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="工作指引(WI)或其他相關的工作表(請註明)"
                                            {...registerTab1("confirmationBeforeCompletionWI")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>移除紅閃燈時間:</Form.Label>
                                        <Form.Control
                                            type="time"
                                            {...registerTab1("confirmationBeforeCompletionRemoveRedLightTime")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="CPDAS"
                                            {...registerTab1("confirmationBeforeCompletionCPDAS")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>離開時間:</Form.Label>
                                        <Form.Control
                                            type="time"
                                            {...registerTab1("confirmationBeforeCompletionLeaveTime")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="每日工地檢查表"
                                            {...registerTab1("confirmationBeforeCompletionDailySiteChecklist")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="安全施工檢討記錄"
                                            {...registerTab1("confirmationBeforeCompletionSafetyReviewRecord")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="路軌清潔檢查表"
                                            {...registerTab1("confirmationBeforeCompletionTrackCleaningChecklist")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="路軌使用檢查表"
                                            {...registerTab1("confirmationBeforeCompletionTrackUsageChecklist")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>


                    {/* 
                    title is "18. 隱患報告"
                    checkbox row list, per line 1 columns
                    list item: 
                    患報告及其他跟進事項: (with input element)
                    不適用
                */}
                    <Row>
                        <Col>
                            <Form.Group controlId="formRiskReport">
                                <Form.Label>18. 隱患報告</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="患報告及其他跟進事項"
                                            {...registerTab1("riskReport")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="不適用"
                                            {...registerTab1("riskReportNA")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>


                    {/* 
                    Row with 2 columns, 
                    left column: 
                    title is "工作人員出席紀錄(適用於非軌道及軌道上工作)",
                    columns list:
                    input element, 安樂員工編號/安全卡
                    input element, 姓名
                    input element, 手提電話
                    
                    new Line:
                    SignatureCanvas, 簽署

                    right column: 
                    title is "進出軌道紀錄(適用於軌道上工作)"
                    columns list:
                    Datepicker element, type is time, 個人進入軌道時間
                    Datepicker element, type is time, 個人離開軌道時間

                    new Line:
                    SignatureCanvas, 合格人員簽署

                */}
                    <Row>
                        <Col>
                            <Form.Group controlId="formAttendanceRecord">
                                <Form.Label>工作人員出席紀錄(適用於非軌道及軌道上工作)</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Label>安樂員工編號/安全卡</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="安樂員工編號/安全卡"
                                            {...registerTab1("attendanceRecordEmployeeID")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>姓名</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="姓名"
                                            {...registerTab1("attendanceRecordName")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>手提電話</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="手提電話"
                                            {...registerTab1("attendanceRecordPhone")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>簽署</Form.Label>
                                        <Form.Control
                                            as={() => <Controller
                                                name='sig1owner'
                                                control={controlTab1}
                                                render={({ field }) => {
                                                    return !getValuesTab1(field?.name) ? <Col
                                                        style={{
                                                            width: "200px",
                                                            height: "100px",
                                                            border: "1px solid black",
                                                        }}
                                                        onClick={() => openSignatureModal({ field })}
                                                    ></Col> : <Col onClick={() => openSignatureModal({ field })} className="signatureImg"> <img src={getValuesTab1(field?.name)} /></Col>
                                                }}
                                            />}
                                        />



                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formTrackRecord">
                                <Form.Label>進出軌道紀錄(適用於軌道上工作)</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Label>個人進入軌道時間:</Form.Label>
                                        <Form.Control
                                            type="time"
                                            {...registerTab1("trackRecordEnterTime")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>個人離開軌道時間:</Form.Label>
                                        <Form.Control
                                            type="time"
                                            {...registerTab1("trackRecordLeaveTime")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>合格人員簽署</Form.Label>
                                        <Form.Control
                                            as={() => <Controller
                                                name='sig1sir'
                                                control={controlTab1}
                                                render={({ field }) => {
                                                    return !getValuesTab1(field?.name) ? <Col
                                                        style={{
                                                            width: "200px",
                                                            height: "100px",
                                                            border: "1px solid black",
                                                        }}
                                                        onClick={() => openSignatureModal({ field })}
                                                    ></Col> : <Col onClick={() => openSignatureModal({ field })} className="signatureImg"> <img src={getValuesTab1(field?.name)} /></Col>
                                                }}
                                            />}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* 
                    Can you write the code based on previous one Row?
                    duplicate the previous Row, and not need to write the title again
                    loop 8 times
                */}
                    <Row>
                        <Col>
                            <Form.Group controlId="formAttendanceRecord">
                                <Form.Label>工作人員出席紀錄(適用於非軌道及軌道上工作)</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Label>安樂員工編號/安全卡</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="安樂員工編號/安全卡"
                                            {...registerTab1("attendanceRecordEmployeeID")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>姓名</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="姓名"
                                            {...registerTab1("attendanceRecordName")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>手提電話</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="手提電話"
                                            {...registerTab1("attendanceRecordPhone")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>簽署</Form.Label>
                                        <Form.Control
                                            as={() => <Controller
                                                name='sig2owner'
                                                control={controlTab1}
                                                render={({ field }) => {
                                                    return !getValuesTab1(field?.name) ? <Col
                                                        style={{
                                                            width: "200px",
                                                            height: "100px",
                                                            border: "1px solid black",
                                                        }}
                                                        onClick={() => openSignatureModal({ field })}
                                                    ></Col> : <Col onClick={() => openSignatureModal({ field })} className="signatureImg"> <img src={getValuesTab1(field?.name)} /></Col>
                                                }}
                                            />}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formTrackRecord">
                                <Form.Label>進出軌道紀錄(適用於軌道上工作)</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Label>個人進入軌道時間:</Form.Label>
                                        <Form.Control
                                            type="time"
                                            {...registerTab1("trackRecordEnterTime")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>個人離開軌道時間:</Form.Label>
                                        <Form.Control
                                            type="time"
                                            {...registerTab1("trackRecordLeaveTime")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>合格人員簽署</Form.Label>
                                        <Form.Control
                                            as={() => <Controller
                                                name='sig2sir'
                                                control={controlTab1}
                                                render={({ field }) => {
                                                    return !getValuesTab1(field?.name) ? <Col
                                                        style={{
                                                            width: "200px",
                                                            height: "100px",
                                                            border: "1px solid black",
                                                        }}
                                                        onClick={() => openSignatureModal({ field })}
                                                    ></Col> : <Col onClick={() => openSignatureModal({ field })} className="signatureImg"> <img src={getValuesTab1(field?.name)} /></Col>
                                                }}
                                            />}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="formAttendanceRecord">
                                <Form.Label>工作人員出席紀錄(適用於非軌道及軌道上工作)</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Label>安樂員工編號/安全卡</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="安樂員工編號/安全卡"
                                            {...registerTab1("attendanceRecordEmployeeID")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>姓名</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="姓名"
                                            {...registerTab1("attendanceRecordName")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>手提電話</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="手提電話"
                                            {...registerTab1("attendanceRecordPhone")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>簽署</Form.Label>
                                        <Form.Control
                                            as={() => <Controller
                                                name='sig3owner'
                                                control={controlTab1}
                                                render={({ field }) => {
                                                    return !getValuesTab1(field?.name) ? <Col
                                                        style={{
                                                            width: "200px",
                                                            height: "100px",
                                                            border: "1px solid black",
                                                        }}
                                                        onClick={() => openSignatureModal({ field })}
                                                    ></Col> : <Col onClick={() => openSignatureModal({ field })} className="signatureImg"> <img src={getValuesTab1(field?.name)} /></Col>
                                                }}
                                            />}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formTrackRecord">
                                <Form.Label>進出軌道紀錄(適用於軌道上工作)</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Label>個人進入軌道時間:</Form.Label>
                                        <Form.Control
                                            type="time"
                                            {...registerTab1("trackRecordEnterTime")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>個人離開軌道時間:</Form.Label>
                                        <Form.Control
                                            type="time"
                                            {...registerTab1("trackRecordLeaveTime")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>合格人員簽署</Form.Label>
                                        <Form.Control
                                            as={() => <Controller
                                                name='sig3sir'
                                                control={controlTab1}
                                                render={({ field }) => {
                                                    return !getValuesTab1(field?.name) ? <Col
                                                        style={{
                                                            width: "200px",
                                                            height: "100px",
                                                            border: "1px solid black",
                                                        }}
                                                        onClick={() => openSignatureModal({ field })}
                                                    ></Col> : <Col onClick={() => openSignatureModal({ field })} className="signatureImg"> <img src={getValuesTab1(field?.name)} /></Col>
                                                }}
                                            />}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="formAttendanceRecord">
                                <Form.Label>工作人員出席紀錄(適用於非軌道及軌道上工作)</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Label>安樂員工編號/安全卡</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="安樂員工編號/安全卡"
                                            {...registerTab1("attendanceRecordEmployeeID")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>姓名</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="姓名"
                                            {...registerTab1("attendanceRecordName")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>手提電話</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="手提電話"
                                            {...registerTab1("attendanceRecordPhone")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>簽署</Form.Label>
                                        <Form.Control
                                            as={() => <Controller
                                                name='sig4owner'
                                                control={controlTab1}
                                                render={({ field }) => {
                                                    return !getValuesTab1(field?.name) ? <Col
                                                        style={{
                                                            width: "200px",
                                                            height: "100px",
                                                            border: "1px solid black",
                                                        }}
                                                        onClick={() => openSignatureModal({ field })}
                                                    ></Col> : <Col onClick={() => openSignatureModal({ field })} className="signatureImg"> <img src={getValuesTab1(field?.name)} /></Col>
                                                }}
                                            />} />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formTrackRecord">
                                <Form.Label>進出軌道紀錄(適用於軌道上工作)</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Label>個人進入軌道時間:</Form.Label>
                                        <Form.Control
                                            type="time"
                                            {...registerTab1("trackRecordEnterTime")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>個人離開軌道時間:</Form.Label>
                                        <Form.Control
                                            type="time"
                                            {...registerTab1("trackRecordLeaveTime")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>合格人員簽署</Form.Label>
                                        <Form.Control
                                            as={() => <Controller
                                                name='sig4sir'
                                                control={controlTab1}
                                                render={({ field }) => {
                                                    return !getValuesTab1(field?.name) ? <Col
                                                        style={{
                                                            width: "200px",
                                                            height: "100px",
                                                            border: "1px solid black",
                                                        }}
                                                        onClick={() => openSignatureModal({ field })}
                                                    ></Col> : <Col onClick={() => openSignatureModal({ field })} className="signatureImg"> <img src={getValuesTab1(field?.name)} /></Col>
                                                }}
                                            />}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="formAttendanceRecord">
                                <Form.Label>工作人員出席紀錄(適用於非軌道及軌道上工作)</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Label>安樂員工編號/安全卡</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="安樂員工編號/安全卡"
                                            {...registerTab1("attendanceRecordEmployeeID")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>姓名</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="姓名"
                                            {...registerTab1("attendanceRecordName")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>手提電話</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="手提電話"
                                            {...registerTab1("attendanceRecordPhone")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>簽署</Form.Label>
                                        <Form.Control
                                            as={() => <Controller
                                                name='sig5owner'
                                                control={controlTab1}
                                                render={({ field }) => {
                                                    return !getValuesTab1(field?.name) ? <Col
                                                        style={{
                                                            width: "200px",
                                                            height: "100px",
                                                            border: "1px solid black",
                                                        }}
                                                        onClick={() => openSignatureModal({ field })}
                                                    ></Col> : <Col onClick={() => openSignatureModal({ field })} className="signatureImg"> <img src={getValuesTab1(field?.name)} /></Col>
                                                }}
                                            />}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formTrackRecord">
                                <Form.Label>進出軌道紀錄(適用於軌道上工作)</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Label>個人進入軌道時間:</Form.Label>
                                        <Form.Control
                                            type="time"
                                            {...registerTab1("trackRecordEnterTime")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>個人離開軌道時間:</Form.Label>
                                        <Form.Control
                                            type="time"
                                            {...registerTab1("trackRecordLeaveTime")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>合格人員簽署</Form.Label>
                                        <Form.Control
                                            as={() => <Controller
                                                name='sig5sir'
                                                control={controlTab1}
                                                render={({ field }) => {
                                                    return !getValuesTab1(field?.name) ? <Col
                                                        style={{
                                                            width: "200px",
                                                            height: "100px",
                                                            border: "1px solid black",
                                                        }}
                                                        onClick={() => openSignatureModal({ field })}
                                                    ></Col> : <Col onClick={() => openSignatureModal({ field })} className="signatureImg"> <img src={getValuesTab1(field?.name)} /></Col>
                                                }}
                                            />}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="formAttendanceRecord">
                                <Form.Label>工作人員出席紀錄(適用於非軌道及軌道上工作)</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Label>安樂員工編號/安全卡</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="安樂員工編號/安全卡"
                                            {...registerTab1("attendanceRecordEmployeeID")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>姓名</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="姓名"
                                            {...registerTab1("attendanceRecordName")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>手提電話</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="手提電話"
                                            {...registerTab1("attendanceRecordPhone")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>簽署</Form.Label>
                                        <Form.Control
                                            as={() => <Controller
                                                name='sig6owner'
                                                control={controlTab1}
                                                render={({ field }) => {
                                                    return !getValuesTab1(field?.name) ? <Col
                                                        style={{
                                                            width: "200px",
                                                            height: "100px",
                                                            border: "1px solid black",
                                                        }}
                                                        onClick={() => openSignatureModal({ field })}
                                                    ></Col> : <Col onClick={() => openSignatureModal({ field })} className="signatureImg"> <img src={getValuesTab1(field?.name)} /></Col>
                                                }}
                                            />}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formTrackRecord">
                                <Form.Label>進出軌道紀錄(適用於軌道上工作)</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Label>個人進入軌道時間:</Form.Label>
                                        <Form.Control
                                            type="time"
                                            {...registerTab1("trackRecordEnterTime")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>個人離開軌道時間:</Form.Label>
                                        <Form.Control
                                            type="time"
                                            {...registerTab1("trackRecordLeaveTime")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>合格人員簽署</Form.Label>
                                        <Form.Control
                                            as={() => <Controller
                                                name='sig6sir'
                                                control={controlTab1}
                                                render={({ field }) => {
                                                    return !getValuesTab1(field?.name) ? <Col
                                                        style={{
                                                            width: "200px",
                                                            height: "100px",
                                                            border: "1px solid black",
                                                        }}
                                                        onClick={() => openSignatureModal({ field })}
                                                    ></Col> : <Col onClick={() => openSignatureModal({ field })} className="signatureImg"> <img src={getValuesTab1(field?.name)} /></Col>
                                                }}
                                            />}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="formAttendanceRecord">
                                <Form.Label>工作人員出席紀錄(適用於非軌道及軌道上工作)</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Label>安樂員工編號/安全卡</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="安樂員工編號/安全卡"
                                            {...registerTab1("attendanceRecordEmployeeID")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>姓名</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="姓名"
                                            {...registerTab1("attendanceRecordName")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>手提電話</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="手提電話"
                                            {...registerTab1("attendanceRecordPhone")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>簽署</Form.Label>
                                        <Form.Control
                                            as={() => <Controller
                                                name='sig7owner'
                                                control={controlTab1}
                                                render={({ field }) => {
                                                    return !getValuesTab1(field?.name) ? <Col
                                                        style={{
                                                            width: "200px",
                                                            height: "100px",
                                                            border: "1px solid black",
                                                        }}
                                                        onClick={() => openSignatureModal({ field })}
                                                    ></Col> : <Col onClick={() => openSignatureModal({ field })} className="signatureImg"> <img src={getValuesTab1(field?.name)} /></Col>
                                                }}
                                            />}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formTrackRecord">
                                <Form.Label>進出軌道紀錄(適用於軌道上工作)</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Label>個人進入軌道時間:</Form.Label>
                                        <Form.Control
                                            type="time"
                                            {...registerTab1("trackRecordEnterTime")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>個人離開軌道時間:</Form.Label>
                                        <Form.Control
                                            type="time"
                                            {...registerTab1("trackRecordLeaveTime")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>合格人員簽署</Form.Label>
                                        <Form.Control
                                            as={() => <Controller
                                                name='sig7sir'
                                                control={controlTab1}
                                                render={({ field }) => {
                                                    return !getValuesTab1(field?.name) ? <Col
                                                        style={{
                                                            width: "200px",
                                                            height: "100px",
                                                            border: "1px solid black",
                                                        }}
                                                        onClick={() => openSignatureModal({ field })}
                                                    ></Col> : <Col onClick={() => openSignatureModal({ field })} className="signatureImg"> <img src={getValuesTab1(field?.name)} /></Col>
                                                }}
                                            />}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formAttendanceRecord">
                                <Form.Label>工作人員出席紀錄(適用於非軌道及軌道上工作)</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Label>安樂員工編號/安全卡</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="安樂員工編號/安全卡"
                                            {...registerTab1("attendanceRecordEmployeeID")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>姓名</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="姓名"
                                            {...registerTab1("attendanceRecordName")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>手提電話</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="手提電話"
                                            {...registerTab1("attendanceRecordPhone")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>簽署</Form.Label>
                                        <Form.Control
                                            as={() => <Controller
                                                name='sig8owner'
                                                control={controlTab1}
                                                render={({ field }) => {
                                                    return !getValuesTab1(field?.name) ? <Col
                                                        style={{
                                                            width: "200px",
                                                            height: "100px",
                                                            border: "1px solid black",
                                                        }}
                                                        onClick={() => openSignatureModal({ field })}
                                                    ></Col> : <Col onClick={() => openSignatureModal({ field })} className="signatureImg"> <img src={getValuesTab1(field?.name)} /></Col>
                                                }}
                                            />}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formTrackRecord">
                                <Form.Label>進出軌道紀錄(適用於軌道上工作)</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Label>個人進入軌道時間:</Form.Label>
                                        <Form.Control
                                            type="time"
                                            {...registerTab1("trackRecordEnterTime")}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>個人離開軌道時間:</Form.Label>
                                        <Form.Control
                                            type="time"
                                            {...registerTab1("trackRecordLeaveTime")}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>合格人員簽署</Form.Label>
                                        <Form.Control
                                            as={() => <Controller
                                                name='sig8sir'
                                                control={controlTab1}
                                                render={({ field }) => {
                                                    return !getValuesTab1(field?.name) ? <Col
                                                        style={{
                                                            width: "200px",
                                                            height: "100px",
                                                            border: "1px solid black",
                                                        }}
                                                        onClick={() => openSignatureModal({ field })}
                                                    ></Col> : <Col onClick={() => openSignatureModal({ field })} className="signatureImg"> <img src={getValuesTab1(field?.name)} /></Col>
                                                }}
                                            />}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>


                    {/* 
                                                                                add new 3 line, texts
                                                                                註一：非安樂員工請填寫有效的建築工人註冊證編號/建造業安全訓練證明書(平安咔)編號。     
                                                                                如有進/出軌道，完工時須再覆核
                                                                                ↓ 以下只適用於軌道上工作 ↓                     
                                                                            */}
                    <Row>
                        <Col xs={12}>
                            <Form.Label>註一：非安樂員工請填寫有效的建築工人註冊證編號/建造業安全訓練證明書(平安咔)編號。</Form.Label>
                        </Col>
                        <Col xs={12}>
                            <Form.Label>如有進/出軌道，完工時須再覆核</Form.Label>
                        </Col>
                        <Col xs={12}>
                            <Form.Label>↓ 以下只適用於軌道上工作 ↓</Form.Label>
                        </Col>
                    </Row>

                    {/* 
                                                                                row columns, 2 columns per line
                                                                                Datepicker element,type is time, name is 核實撤離軌道時間,
                                                                                text: 督導覆核,
                                                                                input element, type is text, name is 合格人員 (CP) 姓名,
                                                                                input element, type is text, name is 姓名,
                                                                                input element, type is text, name is 員工編號/職位,
                                                                                input element, type is text, name is 員工編號/職位,
                                                                                SignatureCanvas, name is 簽署, ref name is Owner簽署
                                                                                SignatureCanvas, name is 簽署, ref name is 督導簽署
                                                                            */}
                    <Row>
                        <Col xs={6}>
                            <Form.Group controlId="formTrackRecord">
                                <Form.Label>核實撤離軌道時間</Form.Label>
                                <Form.Control
                                    type="time"
                                    {...registerTab1("verifyLeaveTrackTime")}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group controlId="formTrackRecord">
                                <Form.Label>督導覆核</Form.Label>
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group controlId="formTrackRecord">
                                <Form.Label>合格人員 (CP) 姓名</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...registerTab1("cpName")}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group controlId="formTrackRecord">
                                <Form.Label>姓名</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...registerTab1("name")}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group controlId="formTrackRecord">
                                <Form.Label>員工編號/職位</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...registerTab1("employeeID")}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group controlId="formTrackRecord">
                                <Form.Label>員工編號/職位</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...registerTab1("employeeID")}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group controlId="formTrackRecord">
                                <Form.Label>簽署</Form.Label>
                                <Form.Control
                                    as={() => <Controller
                                        name='ownerSig'
                                        control={controlTab1}
                                        render={({ field }) => {
                                            return !getValuesTab1(field?.name) ? <Col
                                                style={{
                                                    width: "200px",
                                                    height: "100px",
                                                    border: "1px solid black",
                                                }}
                                                onClick={() => openSignatureModal({ field })}
                                            ></Col> : <Col onClick={() => openSignatureModal({ field })} className="signatureImg"> <img src={getValuesTab1(field?.name)} /></Col>
                                        }}
                                    />}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group controlId="formTrackRecord">
                                <Form.Label>簽署</Form.Label>
                                <Form.Control
                                    as={() => <Controller
                                        name='supervisorSig'
                                        control={controlTab1}
                                        render={({ field }) => {
                                            return !getValuesTab1(field?.name) ? <Col
                                                style={{
                                                    width: "200px",
                                                    height: "100px",
                                                    border: "1px solid black",
                                                }}
                                                onClick={() => openSignatureModal({ field })}
                                            ></Col> : <Col onClick={() => openSignatureModal({ field })} className="signatureImg"> <img src={getValuesTab1(field?.name)} /></Col>
                                        }}
                                    />}
                                />
                            </Form.Group>
                        </Col>
                    </Row>



                </div>
            </form>
        );
    };


    const { register: registerTab2, handleSubmit: handleSubmitTab2, control: controlTab2, getValues: getValuesTab2 } = useForm();
    const uiListForTab2 = [
        {
            type: "text",
            label: "Potential Hazards/Irregularities/Unsafe Acts or Unsafe Conditions 潛在危機/不規則的/不安全行動或不安全的情況",
            grid: 4
        },
        {
            type: "text",
            label: `Safety Precautionary Measures/Actions/ Improvement Actions ${<p>安全預防措施/更正行動/改善行動</p>}`,
            grid: 4
        },
        {
            type: "text",
            label: "Action執行人",
            grid: 4
        },
    ]
    const rowListForTab2 = [
        {
            field: "FallingFromHeight",
            Hazards: "Falling from Height 高空下墜",
            SafetyPrecautionaryMeasures: [
                { label: "合規格工作台", value: "compliantWorkbench" },
                { label: "按照施工程序或相關訓練", value: "followConstructionProcedures" },
                { label: "進行工作", value: "carryOutWork" },
                { label: "不適用", value: "notApplicable" }
            ],
            Actions: [
                { label: "CP", value: "CP" },
                { label: "工人", value: "Worker" }
            ]
        },

        // add new item
        {
            field: "CollapseOfMetalScaffold",
            Hazards: "Collapse of Metal Scaffold 金屬棚架倒下",
            SafetyPrecautionaryMeasures: [
                { label: "合資格人士作定期檢查和維護", value: "qualifiedPersonnelInspectionAndMaintenance" },
                { label: "按照施工程序或相關訓練進行工作", value: "followConstructionProceduresOrTraining" },
                { label: "不適用", value: "notApplicable" }
            ],
            Actions: [
                { label: "CP", value: "CP" },
                { label: "工人", value: "Worker" }
            ]
        },
        {
            field: "FallingObject",
            Hazards: "Falling Object 物件下墜",
            SafetyPrecautionaryMeasures: [
                { label: "使用個人防護裝備", value: "personalProtectiveEquipment" },
                { label: "圍封工作區範圍", value: "encloseWorkArea" },
                { label: "已有足夠安全或警告標示", value: "sufficientSafetyWarningSigns" },
                { label: "不適用", value: "notApplicable" }
            ],
            Actions: [
                { label: "CP", value: "CP" },
                { label: "工人", value: "Worker" }
            ]
        },
        {
            field: "WorkingAtHeightOrWorkingPlatform",
            Hazards: "Working at height/ working platform 高空工作/梯台/工夫櫈",
            SafetyPrecautionaryMeasures: [
                { label: "使用個人防護裝備", value: "personalProtectiveEquipment" },
                { label: "使用前檢查", value: "checkBeforeUse" },
                { label: "預先與有關人作適當安排", value: "makeAppropriateArrangementsWithRelevantPersons" },
                { label: "不適用", value: "notApplicable" }
            ],
            Actions: [
                { label: "CP", value: "CP" },
                { label: "工人", value: "Worker" }
            ]
        },
        // add new item, Electrocution and electric shock 電擊/觸電
        {
            field: "ElectrocutionAndElectricShock",
            Hazards: "Electrocution and electric shock 電擊/觸電",
            SafetyPrecautionaryMeasures: [
                { label: "合資格人士作定期檢查和維護", value: "qualifiedPersonnelInspectionAndMaintenance" },
                { label: "按照施工程序或相關訓練進行工作", value: "followConstructionProceduresOrTraining" },
                { label: "不適用", value: "notApplicable" }
            ],
            Actions: [
                { label: "CP", value: "CP" },
                { label: "工人", value: "Worker" }
            ]
        },
        // Lifting Gear Failure 起重裝置故障
        {
            field: "LiftingGearFailure",
            Hazards: "Lifting Gear Failure 起重裝置故障",
            SafetyPrecautionaryMeasures: [
                { label: "合資格人士作定期檢查和維護", value: "qualifiedPersonnelInspectionAndMaintenance" },
                { label: "提供明確指示及安全負重", value: "provideClearInstructionsAndSafeLoad" },
                { label: "不適用", value: "notApplicable" }
            ],
            Actions: [
                { label: "CP", value: "CP" },
                { label: "工人", value: "Worker" }
            ]
        },
        // add new item, Back Injury/Muscular Strain 背傷/肌肉勞損
        {
            field: "BackInjuryMuscularStrain",
            Hazards: "Back Injury/Muscular Strain 背傷/肌肉勞損",
            SafetyPrecautionaryMeasures: [
                { label: "保持工地整潔", value: "keepTheSiteClean" },
                { label: "工作前熱身", value: "warmUpBeforeWork" },
                { label: "按照施工程序或相關訓練進行工作", value: "followConstructionProceduresOrTraining" },
                { label: "不適用", value: "notApplicable" }
            ],
            Actions: [
                { label: "CP", value: "CP" },
                { label: "工人", value: "Worker" }
            ]
        },
        // add new item, Slipping/Injury 滑倒/利邊割傷
        {
            field: "SlippingInjury",
            Hazards: "Slipping/Injury 滑倒/利邊割傷",
            SafetyPrecautionaryMeasures: [
                { label: "保持工地整潔", value: "keepTheSiteClean" },
                { label: "使用個人防護裝備", value: "personalProtectiveEquipment" },
                { label: "不適用", value: "notApplicable" }
            ],
            Actions: [
                { label: "CP", value: "CP" },
                { label: "工人", value: "Worker" }
            ]
        },
        // add new item, stacking of material 物料存放
        {
            field: "StackingOfMaterial",
            Hazards: "Stacking of Material 物料存放",
            SafetyPrecautionaryMeasures: [
                { label: "保持工地整潔和衛生", value: "keepTheSiteCleanAndHygienic" },
                { label: "物料存放區需圍封", value: "encloseMaterialStorageArea" },
                { label: "不適用", value: "notApplicable" }
            ],
            Actions: [
                { label: "CP", value: "CP" },
                { label: "工人", value: "Worker" }
            ]

        },
        // add new item, Confined Space 密閉空間
        {
            field: "ConfinedSpace",
            Hazards: "Confined Space 密閉空間",
            SafetyPrecautionaryMeasures: [
                { label: "合資格人士作定期監測和維護", value: "qualifiedPersonnelRegularMonitoringAndMaintenance" },
                { label: "按照施工程序或相關訓練進行工作", value: "followConstructionProceduresOrTraining" },
                { label: "使用個人防護裝備", value: "personalProtectiveEquipment" },
                { label: "不適用", value: "notApplicable" }
            ],
            Actions: [
                { label: "CP", value: "CP" },
                { label: "密閉空間核准工人", value: "ConfinedSpaceApprovedWorker" },
                { label: "密閉空間合資格人士", value: "ConfinedSpaceQualifiedPersonnel" },
            ]
        },
        // add new item, Hot Work 熱工序
        {
            field: "HotWork",
            Hazards: "Hot Work 熱工序",
            SafetyPrecautionaryMeasures: [
                { label: "已填寫熱工序許可証及記錄留底", value: "completedHotWorkPermitAndRecordRetention" },
                { label: "防火糾察員作定期監測和維護", value: "qualifiedPersonnelRegularMonitoringAndMaintenance" },
                { label: "按照施工程序或相關訓練進行工作", value: "personalProtectiveEquipment" },
                { label: "使用個人防護裝備", value: "notApplicable" },
                { label: "不適用", value: "notApplicable" }
            ],
            Actions: [
                { label: "CP", value: "CP" },
                { label: "防火糾察員", value: "FirePatrol" },
                { label: "工人", value: "Worker" },
            ]
        },
        // add new item, Work at Track 路軌上工作
        {
            field: "WorkAtTrack",
            Hazards: "Work at Track 路軌上工作",
            SafetyPrecautionaryMeasures: [
                { label: "已填寫路軌使用物品檢查表", value: "qualifiedPersonnelRegularMonitoringAndMaintenance" },
                { label: "已填寫路軌清潔檢查表", value: "completedHotWorkPermitAndRecordRetention" },
                { label: "不適用", value: "notApplicable" }
            ],
            Actions: [
                { label: "CP(T)", value: "CP(T)" },
                { label: "工人", value: "Worker" },
            ]
        },
        // add new item, Fire 火警
        {
            field: "Fire",
            Hazards: "Fire 火警",
            SafetyPrecautionaryMeasures: [
                { label: "適當儲存或搬離危險物品", value: "properStorageOrRemovalOfHazardousMaterials" },
                { label: "按照施工程序或相關訓練進行工作", value: "followConstructionProceduresOrTraining" },
                { label: "滅火器", value: "fireExtinguisher" },
                { label: "嚴禁吸煙", value: "noSmoking" },
                { label: "不適用", value: "notApplicable" }
            ],
            Actions: [
                { label: "CP", value: "CP" },
                { label: "工人", value: "Worker" },
                { label: "FM", value: "FM" },
            ]
        },
        // add new item, Heat Stroke 中暑
        {
            field: "HeatStroke",
            Hazards: "Heat Stroke 中暑",
            SafetyPrecautionaryMeasures: [
                { label: "已進行熱壓力評估", value: "completedHeatStressAssessment" },
                { label: "提供飲用水", value: "provideSufficientDrinkingWater" },
                { label: "提供訓練和監管", value: "provideTrainingAndSupervision" },
                { label: "每工作 1 小時，休息最少 10 分鐘", value: "provideSufficientRest" },
            ],
            Actions: [
                { label: "CP", value: "CP" },
                { label: "工人", value: "Worker" },
            ]
        },
        // add new item, Pollution: Dust/ Water/ Noise 污染：塵埃/水源/噪音
        {
            field: "PollutionDustWaterNoise",
            Hazards: "Pollution: Dust/ Water/ Noise 污染：塵埃/水源/噪音",
            SafetyPrecautionaryMeasures: [
                { label: "使用個人防護裝備", value: "personalProtectiveEquipment" },
                { label: "按照施工程序或相關訓練進行工作", value: "followConstructionProceduresOrTraining" },
                { label: "不適用", value: "notApplicable" }
            ],
            Actions: [
                { label: "CP", value: "CP" },
                { label: "工人", value: "Worker" },
            ]
        },
        // add new item, Hand tools/ Power tools/ testing equipment 具/測試儀器
        {
            field: "HandToolsPowerToolsTestingEquipment",
            Hazards: "Hand tools/ Power tools/ testing equipment 具/測試儀器",
            SafetyPrecautionaryMeasures: [
                { label: "按照施工程序或相關訓練進行工作", value: "followConstructionProceduresOrTraining" },
                { label: "檢查手工具或電動工具狀態良好", value: "checkHandToolsOrPowerToolsInGoodCondition" },
                { label: "不適用", value: "notApplicable" }
            ],
            Actions: [
                { label: "CP", value: "CP" },
                { label: "工人", value: "Worker" },
            ]
        },

    ]
    const tab2 = () => {
        return (
            <form onSubmit={handleSubmitTab2(onSubmit)}>
                <Button type='submit'>Submit</Button>
                <div>
                    {/*  
                        add new line, though uiListForTab2 setting
                    */}
                    <Row>
                        <Col xs={12}>
                            <Form.Label>Record of Hazard Identification Activity (HIA) meeting form 危害識別活動記錄及每日檢查表</Form.Label>
                        </Col>
                    </Row>
                    {/*  Can you make it to table styles? */}
                    <Row>
                        <Col xs={12}>
                            <Table className="table">
                                <thead>
                                    <tr>
                                        {uiListForTab2.map((item, index) => (
                                            <th key={item.label + index}>{item.label}</th>
                                        ))}
                                    </tr>
                                </thead>
                            </Table>
                        </Col>
                    </Row>

                    {/* 
                        Can you generate the UI though rowListForTab2?
                        Per List Item:
                        Hazards is label,
                        SafetyPrecautionaryMeasures: all item is checkbox ,
                        Actions:all item is checkbox 
                    */}
                    <Row>
                        <Col xs={12}>
                            <Table className="table">
                                <tbody>
                                    {rowListForTab2.map((rows, index) => (
                                        <tr
                                            key={rows.field + index}
                                        >
                                            <td>{rows.Hazards}</td>
                                            <td>
                                                {rows.SafetyPrecautionaryMeasures.map((item, index) => (
                                                    <Form.Check
                                                        key={item.label + index}
                                                        type="checkbox"
                                                        label={item?.label}
                                                        {...registerTab2(`${rows?.field}.${item?.value}`)}
                                                    />
                                                ))}
                                            </td>
                                            <td>
                                                {rows.Actions.map((item, index) => (
                                                    <Form.Check
                                                        key={item.label + index}
                                                        type="checkbox"
                                                        label={item?.label}
                                                        {...registerTab2(`${rows?.field}.${item?.value}`)}
                                                    />
                                                ))}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={2}>
                                            Other: 其他
                                            <Form.Control
                                                type="text"
                                                {...registerTab2(`Other.Other1`)}
                                            />
                                            <Form.Control
                                                type="text"
                                                {...registerTab2(`Other.Other2`)}
                                            />
                                        </td>
                                        <td>
                                            <Form.Check
                                                type="checkbox"
                                                label={"CP"}
                                                {...registerTab2(`Other.CP`)}
                                            />
                                            <Form.Check
                                                type="checkbox"
                                                label={"工人"}
                                                {...registerTab2(`Other.Worker`)}
                                            />
                                        </td>
                                    </tr>
                                    {/* 
                                        add new line 
                                        input element , name is Competent person(合格人士)
                                        SignatureCanvas, name is Signature(簽名)
                                        datepicker, type is date, name is Date*(日期):
                                    */}
                                    <tr>
                                        <td>
                                            <Form.Label>Competent person(合格人士)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                {...registerTab2("CompetentPerson")}
                                            />
                                        </td>
                                        <td>
                                            <Form.Label>Signature(簽名)</Form.Label>
                                            <Form.Control
                                                as={() => <Controller
                                                    name='sig9owner'
                                                    control={controlTab2}
                                                    render={({ field }) => {
                                                        return !getValuesTab2(field?.name) ? <Col
                                                            style={{
                                                                width: "200px",
                                                                height: "100px",
                                                                border: "1px solid black",
                                                            }}
                                                            onClick={() => openSignatureModal({ field })}
                                                        ></Col> : <Col onClick={() => openSignatureModal({ field })} className="signatureImg"> <img src={getValuesTab2(field?.name)} /></Col>
                                                    }}
                                                />}
                                            />
                                        </td>
                                        <td>
                                            <Form.Label>Date*(日期):</Form.Label>
                                            <Form.Control
                                                type="date"
                                                {...registerTab2("Date")}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>

                </div>
            </form>
        );
    }


    // create tab3
    const { register: registerTab3, handleSubmit: handleSubmitTab3, control: controlTab3, getValues: getValuesTab3 } = useForm();
    const rowListForTab3 = [
        {
            title: "工地整理(開工前)",
            field: "siteTidinessBeforeWork",
            list: [
                {
                    label: "工作前風險評估?",
                    value: "riskAssessment"
                },
                {
                    label: "物料擺放位置/高度?",
                    value: "materialPlacement"
                },
                {
                    label: "通道?",
                    value: "passage"
                },
                {
                    label: "電線固定/高掛使用?",
                    value: "wireFixation"
                },
                {
                    label: "通風?",
                    value: "ventilation"
                },
                {
                    label: "照明?",
                    value: "lighting"
                },
            ]
        },
        {
            title: "個人防護器具",
            field: "personalProtectiveEquipment",
            list: [
                {
                    label: "安全帽?",
                    value: "safetyHelmet"
                },
                {
                    label: "安全鞋?",
                    value: "safetyShoes"
                },
                {
                    label: "反光衣?",
                    value: "reflectiveVest"
                },
                {
                    label: "手套?",
                    value: "gloves"
                },
                {
                    label: "護目鏡?",
                    value: "goggles"
                },
                {
                    label: "全身式安全帶連救生繩防墮扣?",
                    value: "fullBodySafetyBeltWithRescueRope"
                }
            ]
        },
        // add new item, 急救箱
        {
            title: "急救箱",
            field: "firstAidKit",
            list: [
                {
                    label: "外殼破損?",
                    value: "shellDamage"
                },
                {
                    label: "檢查人員/急救員資料?",
                    value: "personnel"
                },
                {
                    label: "小冊子/每月檢查記錄?",
                    value: "booklet"
                },
                {
                    label: "急救箱物料數量/有效期?",
                    value: "quantity"
                }
            ]
        },
        // 梯具
        {
            title: "梯具",
            field: "ladder",
            list: [
                {
                    label: "外殼或外觀是否安全使用?",
                    value: "ladderAppearance"
                },
                {
                    label: "破損?",
                    value: "ladderDamage"
                },
                {
                    label: "檢查標籤?",
                    value: "checkLabel"
                },
                {
                    label: "不適當使用?",
                    value: "inappropriateUse"
                },
            ]
        },
        // 手工具
        {
            title: "手工具",
            field: "handTools",
            list: [
                {
                    label: "破損?",
                    value: "damage"
                },
                {
                    label: "私自改裝?",
                    value: "unauthorizedModification"
                },
            ]
        },
        // 電工具
        {
            title: "電工具",
            field: "powerTools",
            list: [
                {
                    label: "外殼或外觀是否安全使用?",
                    value: "ladderAppearance"
                },
                {
                    label: "外殼破損?",
                    value: "shellDamage"
                },
                {
                    label: "電線破損/不合適電線?",
                    value: "wireDamage"
                },
                {
                    label: "功能正常?",
                    value: "functionNormal"
                },
                {
                    label: "電線抽插頭?",
                    value: "plug"
                },
                {
                    label: "檢查標籤?",
                    value: "checkLabel"
                },
            ]
        },
        // 熱工序
        {
            title: "熱工序",
            field: "hotWork",
            list: [
                {
                    label: "已填寫熱工序許可証?",
                    value: "hotWorkPermit"
                },
                {
                    label: "已放置滅火設備?",
                    value: "fireEquipment"
                },
                {
                    label: "已定期檢查焊接工具?",
                    value: "regularInspection"
                },
            ]
        },
        // 密閉空間工作
        {
            title: "密閉空間工作",
            field: "confinedSpaceWork",
            list: [
                {
                    label: "已填寫密閉空間風險評估?",
                    value: "confinedSpaceRiskAssessment"
                },
                {
                    label: "已填寫密閉空間許可証?",
                    value: "confinedSpacePermit"
                },
                {
                    label: "已定期檢查密閉空間設備?",
                    value: "regularInspection"
                },
            ]
        },
        // 滅火筒
        {
            title: "滅火筒",
            field: "fireExtinguisher",
            list: [
                {
                    label: "破損?",
                    value: "damage"
                },
                {
                    label: "使用類型?",
                    value: "fireExtinguisherType"
                },
                {
                    label: "壓力?",
                    value: "pressure"
                },
                {
                    label: "有效期?",
                    value: "expiryDate"
                },
            ]
        },
        // 棚架
        {
            title: "棚架",
            field: "scaffold",
            list: [
                {
                    label: "破損?",
                    value: "damage"
                },
                {
                    label: "通道/圍欄/踢腳板?",
                    value: "passageFenceKickboard"
                },
                {
                    label: "表格 5 有效期?",
                    value: "form5ExpiryDate"
                },
                {
                    label: "棚格圖紙?",
                    value: "scaffoldDrawing"
                },
            ]
        },
        // 收工前清掃
        {
            title: "收工前清掃",
            field: "cleanUpBeforeWork",
            list: [
                {
                    label: "物料擺放位置/高度?",
                    value: "materialPlacement"
                },
                {
                    label: "通道?",
                    value: "passage"
                },
                {
                    label: "孔洞/電線槽覆蓋/標示?",
                    value: "holeCovering"
                },
                {
                    label: "工具放回原處?",
                    value: "toolReturn"
                },
                {
                    label: "已清理垃圾桶內垃圾?",
                    value: "cleanGarbage"
                },
            ]
        },
        // 最後檢查
        {
            title: "最後檢查",
            field: "finalCheck",
            list: [
                {
                    label: "清潔工作做妥?",
                    value: "cleanWork"
                },
                {
                    label: "所有火種熄滅?",
                    value: "checkAllFire"
                },
                {
                    label: "所有電工具電線拔掉及儲存好?",
                    value: "checkAllPowerTools"
                },
                {
                    label: "剩餘物料已擺放妥當?",
                    value: "checkAllMaterial"
                },
                {
                    label: "所有員工已離開工地?",
                    value: "checkAllEmployee"
                },
                {
                    label: "電掣閉妥?",
                    value: "checkAllSwitch"
                },
            ]
        },
    ]
    const checkPointListForTab3 = [
        {
            title: "開工前",
            field: "beforeWork",
            list: [
                {
                    label: "正常",
                    value: "normal"
                },
                {
                    label: "需改善",
                    value: "needToImprove"
                },
                {
                    label: "不適用",
                    value: "notApplicable"
                }
            ]
        },
        {
            title: "中午飯後",
            field: "afterLunch",
            list: [
                {
                    label: "正常",
                    value: "normal"
                },
                {
                    label: "需改善",
                    value: "needToImprove"
                },
                {
                    label: "不適用",
                    value: "notApplicable"
                }
            ]
        }
    ]
    const tab3 = () => {
        return (
            <form onSubmit={handleSubmitTab3(onSubmit)}>
                <Button type='submit'>Submit</Button>
                <div>
                    <Row>
                        <Col xs={12}>
                            <Form.Label>每日工地檢查表</Form.Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.Label>工作位置:</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...registerTab3("workLocation")}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Table className="table">
                                <tbody>
                                    <tr>
                                        <td>项目</td>
                                        {checkPointListForTab3.map((item, index) => {
                                            return (
                                                <td key={item.title + index}>{item.title}</td>
                                            )
                                        })}
                                    </tr>



                                    {rowListForTab3.map((rows, rowIndex) => {
                                        return rows?.list.map((item, index) => {
                                            return <React.Fragment key={item.label + index}>
                                                {index === 0 ? <tr key={index}>
                                                    <td colSpan={5}>
                                                        <Form.Label style={{ marginBottom: '8px', marginTop: "16px" }}>
                                                            {rows?.title}
                                                        </Form.Label>
                                                    </td>
                                                </tr> : null}
                                                <tr>
                                                    <td>
                                                        <Form.Label>{item?.label}</Form.Label>
                                                    </td>
                                                    {checkPointListForTab3.map((checkPoint, index) => {
                                                        return <td key={checkPoint.title + index}>
                                                            {checkPoint?.list.map((checkPointItem, index) => {
                                                                return (
                                                                    <Form.Check
                                                                        inline
                                                                        key={checkPointItem.label + index}
                                                                        type="radio"
                                                                        label={checkPointItem?.label}
                                                                        value={checkPointItem?.value}
                                                                        {...registerTab3(`${rows?.field}.${item?.value}.${checkPoint?.field}`)}
                                                                    />
                                                                )
                                                            })}
                                                        </td>
                                                    })}
                                                </tr>
                                            </React.Fragment>
                                        })
                                    })}

                                    <tr>
                                        <td colSpan={3}>
                                            <Form.Group>
                                                <Form.Label>跟進建議：</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    {...registerTab3("suggestions")}
                                                />
                                            </Form.Group>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Form.Label>Date*(日期):</Form.Label>
                                            <Form.Control
                                                type="date"
                                                {...registerTab3("Date")}
                                            />
                                        </td>
                                        <td>
                                            <Form.Label>Competent person(合格人士)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                {...registerTab3("CompetentPerson")}
                                            />
                                        </td>
                                        <td>
                                            <Form.Label>Signature(簽名)</Form.Label>
                                            <Form.Control
                                                as={() => <Controller
                                                    name='sig10owner'
                                                    control={controlTab3}
                                                    render={({ field }) => {
                                                        return !getValuesTab3(field?.name) ? <Col
                                                            style={{
                                                                width: "200px",
                                                                height: "100px",
                                                                border: "1px solid black",
                                                            }}
                                                            onClick={() => openSignatureModal({ field })}
                                                        ></Col> : <Col onClick={() => openSignatureModal({ field })} className="signatureImg"> <img src={getValuesTab3(field?.name)} /></Col>
                                                    }}
                                                />}
                                            />
                                        </td>

                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </div>
            </form>
        );
    }

    // tab4
    const { register: registerTab4, handleSubmit: handleSubmitTab4, control: controlTab4, getValues: getValuesTab4 } = useForm();
    const rowListForTab4 = [
        {
            num: "1.1",
            title: "燈光不足",
            field: "insufficientLighting",
        },
        // 高空工作違規
        {
            num: "1.2",
            title: "高空工作違規",
            field: "highAltitudeWorkViolation",
        },
        // 吊運工作違規
        {
            num: "1.3",
            title: "吊運工作違規",
            field: "hoistingWorkViolation",
        },
        // 阻礙進出通道
        {
            num: "1.4",
            title: "阻礙進出通道",
            field: "obstructingAccess",
        },
        // 地盤整理欠佳
        {
            num: "1.5",
            title: "地盤整理欠佳",
            field: "poorSiteTidiness",
        },
        // 防火措施不足
        {
            num: "1.6",
            title: "防火措施不足",
            field: "insufficientFirePrecautions",
        },
        // 發現手工具損壞
        {
            num: "1.7",
            title: "發現手工具損壞",
            field: "findHandToolDamage",
        },
        // 發現電工具損壞
        {
            num: "1.8",
            title: "發現電工具損壞",
            field: "findPowerToolDamage",
        },
        // 不遵從安全意見改善
        {
            num: "1.9",
            title: "不遵從安全意見改善",
            field: "notFollowSafetyImprovementSuggestions",
        },
        // 發現電線拖地; 使用的電線損壞
        {
            num: "1.10",
            title: "發現電線拖地; 使用的電線損壞",
            field: "findWireDragDamage",
        },
        // 沒有正確使用合規格的個人防護裝備
        {
            num: "1.11",
            title: "沒有正確使用合規格的個人防護裝備",
            field: "notUsingCompliantPPE",
        },
    ]
    const checkPointListForTab4 = [
        {
            field: "todaySafetyPerformance",
            type: "checkbox",
            label: "有",
            value: "yes"
        },
        {
            field: "todaySafetyPerformance",
            type: "checkbox",
            label: "沒有",
            value: "no"
        },
        {
            field: "todaySafetyPerformance",
            type: "checkbox",
            label: "不適用",
            value: "notApplicable"
        },
        {
            field: "responsiblePerson",
            type: "input",
            label: "負責人士",
        }

    ]
    // write the function handleCheckPointListForTab4 For checkPointListForTab4
    // to generate the UI though properties "type" of per item
    // use switch case to handle the type
    const handleCheckPointListForTab4 = (rows, item) => {
        switch (item.type) {
            case "checkbox":
                return (
                    <Col>
                        <Form.Check
                            type="radio"
                            label={item.label}
                            value={item.value}
                            {...registerTab4(`${rows.field}.${[item.field]}`)}
                        />
                    </Col>
                );
            case "input":
                return (
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder={item.label}
                            {...registerTab4(`${rows.field}.${[item.field]}`)}
                        />
                    </Col>
                );
            default:
                return null;
        }

    }
    const tab4 = () => {
        return (
            <form onSubmit={handleSubmitTab4(onSubmit)}>
                <Button type='submit'>Submit</Button>
                <div>
                    <Row>
                        <Col xs={4}>
                            <Form.Label>每日工地檢查表</Form.Label>
                        </Col>
                        <Col xs={4}>
                            {/* 
                               input element , name is 地盤:
                            */}
                            <Form.Label>地盤:</Form.Label>
                            <Form.Control
                                type="text"
                                {...registerTab4("site")}
                            />
                        </Col>
                        <Col xs={4}>
                            {/* 
                               input element , name is 日期:
                            */}
                            <Form.Label>日期:</Form.Label>
                            <Form.Control
                                type="date"
                                {...registerTab4("date")}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Table className="table">
                                <tbody>
                                    <tr>
                                        <td>項目</td>
                                        <td colSpan={3}>重點記錄</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}>***1</td>
                                        <td></td>
                                        <td colSpan={1}>
                                            今天安全表現:
                                        </td>
                                    </tr>

                                    {
                                        rowListForTab4.map((rows, index) => {
                                            return (
                                                <tr key={rows.title + index}>
                                                    <td>{rows?.num}</td>
                                                    <td colSpan={3}>{rows?.title}</td>
                                                    <td>
                                                        {checkPointListForTab4.map((item, index) => {
                                                            return <Row key={item.label + index}>
                                                                {handleCheckPointListForTab4(rows, item)}
                                                            </Row>
                                                        })}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr>
                                        <td colSpan={3}>1.12</td>
                                        <td>
                                            其他:
                                            <Form.Control
                                                type="text"
                                                {...registerTab4("other.text")} />
                                        </td>
                                        <td>
                                            {checkPointListForTab4.map((item, index) => {
                                                return <Row key={item.label + index}>
                                                    {handleCheckPointListForTab4({ field: "other" }, item)}
                                                </Row>
                                            })}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}>1.13</td>
                                        <td>
                                            其他:
                                            <Form.Control
                                                type="text"
                                                {...registerTab4("other2.text")} />
                                        </td>
                                        <td>
                                            {checkPointListForTab4.map((item, index) => {
                                                return <Row key={item.label + index}>
                                                    {handleCheckPointListForTab4({ field: "other2" }, item)}
                                                </Row>
                                            })}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}>1.14</td>
                                        <td>
                                            其他:
                                            <Form.Control
                                                type="text"
                                                {...registerTab4("other3.text")} />
                                        </td>
                                        <td>
                                            {checkPointListForTab4.map((item, index) => {
                                                return <Row key={item.label + index}>
                                                    {handleCheckPointListForTab4({ field: "other3" }, item)}
                                                </Row>
                                            })}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan={5}>
                                            <Form.Label>2. 明天需跟進事項:</Form.Label>
                                            <Form.Control
                                                type="textarea"
                                                rows={3}
                                                {...registerTab4("tomorrowFollowUp")}
                                            />
                                        </td>
                                    </tr>

                                    {/* 
                                        new line, rows,
                                        input element , name is 合格人員姓名:
                                        input element , name is 合格人員簽署：
                                    */}
                                    <tr>
                                        <td >
                                            <Form.Label>合格人員姓名:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                {...registerTab4("qualifiedPersonnelName")}
                                            />
                                        </td>
                                        <td colSpan={3}>
                                            <Form.Label>合格人員簽署:</Form.Label>
                                            <Form.Control
                                                as={() => <Controller
                                                    name='sig11owner'
                                                    control={controlTab4}
                                                    render={({ field }) => {
                                                        return !getValuesTab4(field?.name) ? <Col
                                                            style={{
                                                                width: "200px",
                                                                height: "100px",
                                                                border: "1px solid black",
                                                            }}
                                                            onClick={() => openSignatureModal({ field })}
                                                        ></Col> : <Col onClick={() => openSignatureModal({ field })} className="signatureImg"> <img src={getValuesTab4(field?.name)} /></Col>
                                                    }}
                                                />}
                                            />
                                        </td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </div>
            </form>
        );
    }


    // tab5
    const { register: registerTab5, handleSubmit: handleSubmitTab5, control: controlTab5, getValues: getValuesTab5 } = useForm();
    const tab5List = [
        {
            title: "開工前",
            field: "beforeWork",
            list: [
                {
                    label: "已呈交檢查申請表格及工作申請",
                    value: "inspectionApplicationForm"
                },
                {
                    label: "已有批核的施工方案",
                    value: "approvedConstructionPlan"
                },
                {
                    label: "已用中文向工人講解施工方案及施工前因應已評估風險所需安全措施的安排",
                    value: "chineseConstructionPlan"
                },
                {
                    label: "已向值日站長(車站)/調車地主管(車廠】報告工作詳情,工作隊,工作地點和時段及獲批准開工",
                    value: "reportWorkDetails"
                },
                {
                    label: "批准工人開工前,已提供及確保所有安全設備及措施齊備",
                    value: "provideSafetyEquipment"
                },
                {
                    label: "於檢查以上項目1-5後,已通知當值工務督察開始施工",
                    value: "notifyDutyInspector"
                },
            ]
        },
        {
            title: "施工期間",
            field: "duringConstruction",
            list: [
                {
                    label: "施工時發現的不安全/不當行為及/或與施工方案/圖則/規格的偏差已修正",
                    value: "unsafeBehavior"
                },
                {
                    label: "於當值工務督察巡查時發現的不當行為/偏差事項已修正",
                    value: "dutyInspector"
                },
                {
                    label: "完工後的清掃及安全檢查已完成",
                    value: "cleaning"
                }
            ]
        },
        {
            title: "完工後",
            field: "afterCompletion",
            list: [
                {
                    label: "已邀請值日站長(車站)/調車場主管(車廠》共同視察工地",
                    value: "inviteDutyInspector"
                },
                {
                    label: "為即時跟進不當行為/偏差事項,已作出特別安排",
                    value: "followUp"
                },
                {
                    label: "已通知當值工務督察完工( 於現場通知/ 用電話通知)",
                    value: "notifyDutyInspector"
                }
            ]
        }
    ];
    const tab5 = () => {
        return (
            <form onSubmit={handleSubmitTab5(onSubmit)}>
                <Button type='submit'>Submit</Button>
                <div>
                    <Row>
                        <Col xs={12}>
                            <Form.Label>合格人員職責執行表格(CPDAS)</Form.Label>
                        </Col>
                        <Col xs={12}>
                            <Form.Label>合約編號及名稱:  M1172-18E</Form.Label>
                        </Col>
                        <Col xs={12}>
                            <Form.Label>承辦商: ATAL Building Services Engineering Ltd.</Form.Label>
                        </Col>
                        <Col xs={6}>
                            <Form.Group>
                                <Form.Label>日期:</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...registerTab5("date")}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group>
                                <Form.Label>時間:</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...registerTab5("time")}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group>
                                <Form.Label>工地:</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...registerTab5("site")}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Label>檢查項目</Form.Label>
                        </Col>
                        <Col xs={12}>
                            <Form.Label>(結果: Y=是 / N=否 / NA=不適用)</Form.Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Table className="table">
                                <tbody>
                                    {tab5List.map((rows, index) => {
                                        return rows?.list.map((item, index) => {
                                            return (
                                                <React.Fragment key={item.label + index}>
                                                    {index === 0 ? <tr >
                                                        <td colSpan={5}>
                                                            {rows.title}
                                                        </td>
                                                    </tr> : null}
                                                    <tr >
                                                        <td>{item?.label}</td>
                                                        <td>
                                                            <Form.Check
                                                                type="radio"
                                                                label="Y"
                                                                value="Y"
                                                                {...registerTab5(`${rows.field}.${item?.value}`)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Check
                                                                type="radio"
                                                                label="N"
                                                                value="N"
                                                                {...registerTab5(`${rows.field}.${item?.value}`)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Check
                                                                type="radio"
                                                                label="NA"
                                                                value="NA"
                                                                {...registerTab5(`${rows.field}.${item?.value}`)}
                                                            />
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            )
                                        })
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                        <Row>
                            <Col xs={6}>
                                <Form.Label>合格人員姓名及簽署:</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...registerTab5("qualifiedPersonnel")}
                                />
                            </Col>
                            <Col xs={6}>
                                <Form.Control
                                    as={() => <Controller
                                        name='qualifiedPersonnelSig'
                                        control={controlTab5}
                                        render={({ field }) => {
                                            return !getValuesTab5(field?.name) ? <Col
                                                style={{
                                                    width: "200px",
                                                    height: "100px",
                                                    border: "1px solid black",
                                                }}
                                                onClick={() => openSignatureModal({ field })}
                                            ></Col> : <Col onClick={() => openSignatureModal({ field })} className="signatureImg"> <img src={getValuesTab5(field?.name)} /></Col>
                                        }}
                                    />}
                                />
                            </Col>
                        </Row>

                        {/*
                            工務督察姓名及簽署(*)
                        */}
                        <Row>
                            <Col xs={6}>
                                <Form.Label>工務督察姓名及簽署:</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...registerTab5("inspector")}
                                />
                            </Col>
                            <Col xs={6}>
                                <Form.Control
                                    as={() => <Controller
                                        name='inspectorSig'
                                        control={controlTab5}
                                        render={({ field }) => {
                                            return !getValuesTab5(field?.name) ? <Col
                                                style={{
                                                    width: "200px",
                                                    height: "100px",
                                                    border: "1px solid black",
                                                }}
                                                onClick={() => openSignatureModal({ field })}
                                            ></Col> : <Col onClick={() => openSignatureModal({ field })} className="signatureImg"> <img src={getValuesTab5(field?.name)} /></Col>
                                        }}
                                    />}
                                />
                            </Col>
                        </Row>

                        <Col xs={12}>
                            <Form.Label>備註:*如項目的檢查結果為"N",合格人員需先修正及在此記錄詳情方可繼續。</Form.Label>
                        </Col>
                        <Col xs={12}>
                            <Form.Label>(#)因應工作需要的工作許可證例如:工作許可證(電氣)/(機械)/(熱作)/鎖探/連接工程許可證</Form.Label>
                        </Col>
                        <Col xs={12}>
                            <Form.Label>(*)如於完工前離開工地,工務督察須於簽署後記錄離開時。</Form.Label>
                        </Col>
                    </Row>
                </div>
            </form>
        )
    }


    // signature Modal Handle
    const [show, setShow] = useState(false);
    const [onChangeFunc, setOnChangeFunc] = useState(null);
    const handleClose = useCallback(() => setShow(false), []);
    const openSignatureModal = ({ field }) => {
        setOnChangeFunc(field);
        setShow(true);
    }


    return (
        <div>
            <Tabs activeKey={activeTab} onSelect={handleTabSelect}>
                {tabNames.map((tabName, index) => (
                    <Tab key={tabName + index} eventKey={index + 1} title={`${tabName}`}>
                        {handleFormPage(tabName)}
                        <Modal show={show} onHide={handleClose}>
                            <Button onClick={handleClose}>Close</Button>
                            <SignatureCanvas
                                clearOnResize={false}
                                ref={(ref) => {
                                    sigCanvasRef.current = ref
                                }}
                                canvasProps={{
                                    className: "sigCanvas"
                                }}
                                onEnd={() => {
                                    let getPad = sigCanvasRef.current?.getTrimmedCanvas();
                                    if (getPad) {
                                        onChangeFunc.onChange(getPad.toDataURL());
                                    }
                                }}
                            />
                        </Modal>
                    </Tab>
                ))}
            </Tabs>

        </div>

    );
};

export default EFormComponent;







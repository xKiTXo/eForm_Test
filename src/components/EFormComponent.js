import React, { useState } from 'react';
import { Tabs, Tab, InputGroup, FormControl, Button, Form, Col, Row } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker } from 'rsuite';

const EFormComponent = () => {
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
        }
    };


    const { register, handleSubmit, control } = useForm();
    const [options, setOptions] = useState(["", "HIK", "FTA", "MCV"]);

    const onSubmit = (data) => {

        console.log(data);
        if (data?.qualifiedPerson) {
            console.log(data.qualifiedPerson);
        }
    };


    const tab1 = () => {
        return (
            <div>
                <h1>合格人員 – 工作前安全會議</h1>
                <Row>
                    <Col xs={4}>
                        <Form.Label>查詢預設工作類別</Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="查詢預設工作類別"
                                aria-label="查詢預設工作類別"
                                aria-describedby="basic-addon2"
                                {...register("workType")}
                            />
                            <Button variant="outline-secondary" id="button-addon2">
                                搜尋
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formWorkCategory">
                            <Form.Label>工作類別</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="工作類別"
                                {...register("workCategory")}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formQualifiedPerson">
                            <Form.Label>合格人員</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="合格人員"
                                    {...register("qualifiedPerson")}
                                />
                                <Button variant="outline-secondary" id="button-addon2">
                                    搜尋
                                </Button>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formWorkLocation">
                            <Form.Label>工作地點</Form.Label>
                            <Form.Select {...register("workLocation")}>
                                {options.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="formDate">
                            <Form.Label>日期</Form.Label>
                            <FormControl
                                as={() => <Controller
                                    name='date'
                                    control={control}
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
                            </FormControl>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formMeetingTime">
                            <Form.Label>安全會議時間</Form.Label>
                            <Form.Control
                                type="time"
                                placeholder="安全會議時間"
                                {...register("meetingTime")}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formEngineeringScope">
                            <Form.Label>工程領域範圍</Form.Label>
                            <Form.Select
                                {...register("engineeringScope")}
                            >
                                <option value=""></option>
                                <option value="是">是</option>
                                <option value="否">否</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="formWO">
                            <Form.Label>WO 編號</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="WO 編號"
                                {...register("woNumber")}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formEnterTime">
                            <Form.Label>進入軌道時間</Form.Label>
                            <Form.Control
                                type="time"
                                placeholder="進入軌道時間"
                                {...register("enterTime")}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formTN">
                            <Form.Label>TN/ETMS 編號</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="TN/ETMS 編號"
                                {...register("tnNumber")}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Label>
                    會議項目<span style={{ paddingLeft: "3rem" }}></span>
                    選出下列適用項目並提醒員工注意 (所有要點提示必須填寫)
                </Form.Label>

                <Row>
                    <Col>
                        <Form.Group controlId="formValidDocuments">
                            <Form.Label>1. 有效證件</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="建造業安全訓練證明書(平安卡)"
                                        {...register("validDocuments1")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="建造業工人註冊證"
                                        {...register("validDocuments2")}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                    </Col>
                </Row>

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
                <Row>
                    <Col>
                        <Form.Group controlId="formWorkEnvironment">
                            <Form.Label>2. 工作環境</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="軌道上或附近"
                                        {...register("workEnvironmentTrack")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="架空電線上或附近"
                                        {...register("workEnvironmentOverheadWire")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="電力裝置"
                                        {...register("workEnvironmentPowerDevice")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="帶電導體上或附近"
                                        {...register("workEnvironmentChargedConductor")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="密閉空間"
                                        {...register("workEnvironmentConfinedSpace")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="挖掘工程"
                                        {...register("workEnvironmentExcavation")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="狹窄空間"
                                        {...register("workEnvironmentNarrowSpace")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="高空工作"
                                        {...register("workEnvironmentHighAltitude")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="酷熱環境"
                                        {...register("workEnvironmentHotEnvironment")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="空氣污染"
                                        {...register("workEnvironmentAirPollution")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="交通車輛"
                                        {...register("workEnvironmentVehicles")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>其他:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="其他"
                                        {...register("workEnvironmentOther")}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                    </Col>
                </Row>

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
                <Row>
                    <Col>
                        <Form.Group controlId="formHiddenDanger">
                            <Form.Label>隱患/風險</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="照明不足"
                                        {...register("hiddenDangerInsufficientLighting")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="通風欠佳"
                                        {...register("hiddenDangerPoorVentilation")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="地面濕滑"
                                        {...register("hiddenDangerSlipperyGround")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="地面不平/斜路"
                                        {...register("hiddenDangerUnevenGround")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="阻礙物"
                                        {...register("hiddenDangerObstacle")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="隙縫(裂口)"
                                        {...register("hiddenDangerCrack")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="墮下"
                                        {...register("hiddenDangerFall")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="缺氧"
                                        {...register("hiddenDangerOxygenDeficiency")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="中暑"
                                        {...register("hiddenDangerHeatStroke")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="電器設備跳火"
                                        {...register("hiddenDangerElectricalEquipmentFire")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="觸電/漏電"
                                        {...register("hiddenDangerElectricShock")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>其他:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="其他"
                                        {...register("hiddenDangerOther")}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                    </Col>
                </Row>


                {/* 
                    Part 3. title is "滑倒、絆倒、跌倒交通/黑點" 
                    input element, has checkbox name is "不適用" at right of input element,
                    input element is disabled when checkbox is checked
                */}
                <Row>
                    <Col>
                        <Form.Group controlId="formSlipTripFall">
                            <Form.Label>滑倒、絆倒、跌倒交通/黑點</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="滑倒、絆倒、跌倒交通/黑點"
                                        {...register("slipTripFall")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="不適用"
                                        {...register("slipTripFallNA")}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                    </Col>
                </Row>


                {/* 
                    title is "控制措施", input element.
                    title is "要點提示", input element.
                */}
                <Row>
                    <Col>
                        <Form.Group controlId="formControlMeasures">
                            <Form.Label>控制措施</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="控制措施"
                                {...register("controlMeasures")}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formKeyPoints">
                            <Form.Label>要點提示</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="要點提示"
                                {...register("keyPoints")}
                            />
                        </Form.Group>
                    </Col>
                </Row>


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
                <Row>
                    <Col>
                        <Form.Group controlId="formWeather">
                            <Form.Label>3.天氣</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="正常"
                                        {...register("weatherNormal")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="烈日"
                                        {...register("weatherSun")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="暴雨"
                                        {...register("weatherRain")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="勁風"
                                        {...register("weatherStrongWind")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="雷暴"
                                        {...register("weatherThunderstorm")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="颱風"
                                        {...register("weatherTyphoon")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="酷熱"
                                        {...register("weatherHot")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="低溫"
                                        {...register("weatherCold")}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                    </Col>
                </Row>

                {/* 
                    title is "保護措施", input element.
                    title is "要點提示", input element.
                */}
                <Row>
                    <Col>
                        <Form.Group controlId="formProtectionMeasures">
                            <Form.Label>保護措施</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="保護措施"
                                {...register("protectionMeasures")}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formKeyPoints">
                            <Form.Label>要點提示</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="要點提示"
                                {...register("keyPoints")}
                            />
                        </Form.Group>
                    </Col>
                </Row>


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
                <Row>
                    <Col>
                        <Form.Group controlId="formProtectionMeasuresAndSafetyDocuments">
                            <Form.Label>4.保護措施及安全文件</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="工程領域"
                                        {...register("protectionMeasuresEngineeringScope")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="軌道車輛運行安排"
                                        {...register("protectionMeasuresTrackVehicleArrangement")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="軌道上或附近工作"
                                        {...register("protectionMeasuresTrackWork")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="非工程領域"
                                        {...register("protectionMeasuresNonEngineeringScope")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="行車時間"
                                        {...register("protectionMeasuresDrivingTime")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="非行車時間"
                                        {...register("protectionMeasuresNonDrivingTime")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="非軌道上或附近工作"
                                        {...register("protectionMeasuresNonTrackWork")}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                    </Col>
                </Row>


                {/* 
                    title is "保護措施"
                    checkbox row list, per line 4 columns
                    list item:
                    路軌夾 手提燈/信號燈 號角+燈/旗 止輪器 圍欄
                    密閉空間器具 
                    checkbox has input text in one line below:
                    其他： 紅閃燈位置： 接地棒位置：
                */}
                <Row>
                    <Col>
                        <Form.Group controlId="formProtectionMeasures">
                            <Form.Label>保護措施</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="路軌夾"
                                        {...register("protectionMeasuresTrackClamp")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="手提燈/信號燈"
                                        {...register("protectionMeasuresHandLamp")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="號角+燈/旗"
                                        {...register("protectionMeasuresHorn")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="止輪器"
                                        {...register("protectionMeasuresWheelStopper")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="圍欄"
                                        {...register("protectionMeasuresFence")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="密閉空間器具"
                                        {...register("protectionMeasuresConfinedSpace")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>其他：</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="其他"
                                        {...register("protectionMeasuresOther")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>紅閃燈位置：</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="紅閃燈位置"
                                        {...register("protectionMeasuresRedLightPosition")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>接地棒位置：</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="接地棒位置"
                                        {...register("protectionMeasuresGroundingRodPosition")}
                                    />
                                </Col>
                                {/*  接地棒位置： has checkbox name is "不適用" at right of input element */}
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="不適用"
                                        {...register("protectionMeasuresGroundingRodPositionNA")}
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
                                        {...register("safetyDocumentsPTW")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="電路隔離證書 CIC"
                                        {...register("safetyDocumentsCIC")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="試驗許可證SFT"
                                        {...register("safetyDocumentsSFT")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="工作範圍限制證 LOA"
                                        {...register("safetyDocumentsLOA")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="工作證書(密閉空間)CFW(CS)"
                                        {...register("safetyDocumentsCFW")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="IRF 隔電紀錄"
                                        {...register("safetyDocumentsIRF")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="Form 5 金屬棚架"
                                        {...register("safetyDocumentsForm5")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="電力安全評估表格(15B)"
                                        {...register("safetyDocuments15B")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="不適用"
                                        {...register("safetyDocumentsNA")}
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
                                        {...register("riskContent")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>要點提示</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="要點提示"
                                        {...register("keyPoints")}
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
                                        {...register("ppeSafetyShoes")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="螢光衣"
                                        {...register("ppeFluorescentClothes")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="安全帽"
                                        {...register("ppeSafetyHat")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="安全帽- 下頜帶"
                                        {...register("ppeSafetyHatChinStrap")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="護目鏡"
                                        {...register("ppeGoggles")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="口罩"
                                        {...register("ppeMask")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="雨衣"
                                        {...register("ppeRaincoat")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="安全帶"
                                        {...register("ppeSafetyBelt")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="保護手套"
                                        {...register("ppeProtectiveGloves")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="耳罩/耳塞"
                                        {...register("ppeEarMuffs")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="高壓絕緣手套"
                                        {...register("ppeHighVoltageInsulationGloves")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="安全水鞋"
                                        {...register("ppeSafetyWaterShoes")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="電筒"
                                        {...register("ppeFlashlight")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="防電弧保護服"
                                        {...register("ppeArcProtectionSuit")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>其他：</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="其他"
                                        {...register("ppeOther")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>要點提示</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="要點提示"
                                        {...register("keyPoints")}
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
                                        {...register("emergencyArrangementEmergencySupport")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="進出工地路線"
                                        {...register("emergencyArrangementSiteAccessRoute")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="逃生路線"
                                        {...register("emergencyArrangementEscapeRoute")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="滅火筒位置"
                                        {...register("emergencyArrangementFireExtinguisherPosition")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="急救箱"
                                        {...register("emergencyArrangementFirstAidKit")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>要點提示</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="要點提示"
                                        {...register("keyPoints")}
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
                                        {...register("aloneWork")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="觀察四周環境以辨識潛在風險"
                                        {...register("aloneWorkObserve")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="與上司或有關人士保持聯絡(如出入工地，開始及完成工作)"
                                        {...register("aloneWorkContact")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="不適用"
                                        {...register("aloneWorkNA")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>要點提示</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="要點提示"
                                        {...register("keyPoints")}
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
                                        {...register("environmentalImpactNoise")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="符合 「 建築噪音許可證 」 要求"
                                        {...register("environmentalImpactNoisePermit")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="利用相關的 「 消滅噪音措施查核表 」 完成核實"
                                        {...register("environmentalImpactNoiseChecklist")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="化學廢料"
                                        {...register("environmentalImpactChemicalWaste")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="燈光滋擾"
                                        {...register("environmentalImpactLightDisturbance")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="不適用"
                                        {...register("environmentalImpactNA")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>要點提示</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="要點提示"
                                        {...register("keyPoints")}
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
                                        {...register("otherNotesWork")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="安全駕駛及提點 (路軌車)"
                                        {...register("otherNotesSafeDriving")}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="危險物料"
                                        {...register("otherNotesDangerousMaterials")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>工具/設備：</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="工具/設備"
                                        {...register("otherNotesTools")}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>要點提示</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="要點提示"
                                        {...register("keyPoints")}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                    </Col>
                </Row>


            </div>
        );
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Button type='submit'>Submit</Button>
            <Tabs activeKey={activeTab} onSelect={handleTabSelect}>
                {tabNames.map((tabName, index) => (
                    <Tab key={index} eventKey={index + 1} title={`${tabName}`}>
                        {handleFormPage(tabName)}
                    </Tab>
                ))}
            </Tabs>
        </form>
    );
};

export default EFormComponent;







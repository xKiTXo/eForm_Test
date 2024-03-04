import React, { useState } from 'react';
import { Tabs, Tab, InputGroup, FormControl, Button, Form, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

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


    const { register, handleSubmit } = useForm();
    const [options, setOptions] = useState(["", "HIK", "FTA", "MCV"]);

    const onSubmit = (data) => {
        console.log(data);
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







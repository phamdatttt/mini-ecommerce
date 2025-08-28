import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Space,
  Typography,
  Select,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;
const { Title, Text } = Typography;

interface Specification {
  id: string;
  name: string;
  value: string;
  category?: string;
}

interface ProductSpecificationsFormProps {
  initialSpecifications?: Specification[];
}

const ProductSpecificationsForm: React.FC<ProductSpecificationsFormProps> = ({
  initialSpecifications = [],
}) => {
  const [specifications, setSpecifications] = useState<Specification[]>(
    initialSpecifications
  );
  const form = Form.useFormInstance();

  // Load initial specifications when prop changes
  useEffect(() => {
    if (initialSpecifications && initialSpecifications.length > 0) {
      const specsWithIds = initialSpecifications.map((spec, index) => ({
        ...spec,
        id: spec.id || `spec-${Date.now()}-${index}`,
      }));
      setSpecifications(specsWithIds);
    }
  }, [initialSpecifications]);

  // Nhóm thông số cho quần áo
  const specificationCategories = [
    'Kích cỡ',
    'Chất liệu & cảm giác',
    'Thiết kế',
    'Chăm sóc',
    'Thông tin khác',
    'Thông số chung',
    'Khác',
  ];

  // Sync specifications với form
  useEffect(() => {
    form.setFieldValue('specifications', specifications);
  }, [specifications, form]);

  const addSpecification = () => {
    const newSpec: Specification = {
      id: Date.now().toString(),
      name: '',
      value: '',
      category: 'Thông số chung',
    };
    setSpecifications((prev) => [...prev, newSpec]);
  };

  const updateSpecification = (
    id: string,
    field: keyof Specification,
    value: string
  ) => {
    setSpecifications((specs) =>
      specs.map((spec) => (spec.id === id ? { ...spec, [field]: value } : spec))
    );
  };

  const removeSpecification = (id: string) => {
    setSpecifications((specs) => specs.filter((spec) => spec.id !== id));
  };

  // Template mẫu cho quần áo (giữ tên hàm để không ảnh hưởng nơi khác)
  const addSampleSpecifications = () => {
    const now = Date.now();
    const sampleSpecs: Specification[] = [
      { id: `sample-${now}-1`,  name: 'Size',       value: 'M',             category: 'Kích cỡ' },
      { id: `sample-${now}-2`,  name: 'Dáng',       value: 'Regular',       category: 'Kích cỡ' },
      { id: `sample-${now}-3`,  name: 'Chất liệu',  value: 'Cotton 100%',   category: 'Chất liệu & cảm giác' },
      { id: `sample-${now}-4`,  name: 'Độ dày',     value: 'Vừa',           category: 'Chất liệu & cảm giác' },
      { id: `sample-${now}-5`,  name: 'Độ co giãn', value: 'Ít',            category: 'Chất liệu & cảm giác' },
      { id: `sample-${now}-6`,  name: 'Màu',        value: 'Đen',           category: 'Thiết kế' },
      { id: `sample-${now}-7`,  name: 'Họa tiết',   value: 'Trơn',          category: 'Thiết kế' },
      { id: `sample-${now}-8`,  name: 'Cổ áo',      value: 'Cổ tròn',       category: 'Thiết kế' },
      { id: `sample-${now}-9`,  name: 'Tay áo',     value: 'Ngắn',          category: 'Thiết kế' },
      { id: `sample-${now}-10`, name: 'HDSD giặt',  value: 'Giặt máy 30°C', category: 'Chăm sóc' },
      { id: `sample-${now}-11`, name: 'Ủi',         value: '≤110°C',        category: 'Chăm sóc' },
      { id: `sample-${now}-12`, name: 'Giới tính',  value: 'Unisex',        category: 'Thông tin khác' },
      { id: `sample-${now}-13`, name: 'Mùa',        value: 'Quanh năm',     category: 'Thông tin khác' },
      { id: `sample-${now}-14`, name: 'SKU',        value: 'AUTO-GEN',      category: 'Thông tin khác' },
    ];

    setSpecifications((prev) => [...prev, ...sampleSpecs]);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={3}>
        <InfoCircleOutlined style={{ marginRight: 8 }} />
        Thông số sản phẩm
      </Title>
      <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
        Thêm các thông số chi tiết để khách hàng có thể so sánh và đánh giá sản phẩm
      </Text>

      {/* Add Specification Button */}
      <div style={{ marginBottom: 24 }}>
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={addSpecification}
            size="large"
          >
            Thêm thông tin sản phẩm
          </Button>
          <Button type="default" onClick={addSampleSpecifications} size="large">
            Thêm mẫu quần áo
          </Button>
        </Space>
      </div>

      {/* Specifications List */}
      {specifications.length > 0 && (
        <Card title="📋 Danh sách thông số" style={{ marginBottom: 24 }}>
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            {specifications.map((spec, index) => (
              <Card
                key={`${spec.id}-${index}`}
                size="small"
                style={{ backgroundColor: '#fafafa' }}
              >
                <Row gutter={16} align="middle">
                  <Col span={6}>
                    <Input
                      placeholder="Tên thông số (VD: Size, Chất liệu, Màu...)"
                      value={spec.name}
                      onChange={(e) =>
                        updateSpecification(spec.id, 'name', e.target.value)
                      }
                    />
                  </Col>
                  <Col span={10}>
                    <TextArea
                      placeholder="Giá trị thông số (VD: M, Cotton 100%, Đen...)"
                      value={spec.value}
                      onChange={(e) =>
                        updateSpecification(spec.id, 'value', e.target.value)
                      }
                      rows={1}
                      autoSize={{ minRows: 1, maxRows: 3 }}
                    />
                  </Col>
                  <Col span={6}>
                    <Select
                      placeholder="Chọn nhóm"
                      value={spec.category}
                      onChange={(value) =>
                        updateSpecification(spec.id, 'category', value)
                      }
                      style={{ width: '100%' }}
                      options={specificationCategories.map((c) => ({
                        label: c,
                        value: c,
                      }))}
                    />
                  </Col>
                  <Col span={2}>
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => removeSpecification(spec.id)}
                    />
                  </Col>
                </Row>
              </Card>
            ))}
          </Space>
        </Card>
      )}

      {/* Empty State */}
      {specifications.length === 0 && (
        <Card
          style={{
            textAlign: 'center',
            padding: '40px 20px',
            border: '2px dashed #d9d9d9',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: 16 }}>📋</div>
          <Title level={4} style={{ color: '#999' }}>
            Chưa có thông tin sản phẩm nào
          </Title>
          <Text type="secondary">
            Nhấn nút "Thêm thông tin sản phẩm" hoặc "Thêm mẫu quần áo" để bắt đầu
          </Text>
        </Card>
      )}

      {/* Hidden Form Field to store specifications */}
      <Form.Item name="specifications" style={{ display: 'none' }}>
        <Input />
      </Form.Item>

      {/* Summary */}
      {specifications.length > 0 && (
        <Card title="📊 Tổng quan" style={{ marginTop: 24 }} size="small">
          <Text strong>
            Tổng cộng: {specifications.length} thông tin sản phẩm
          </Text>
        </Card>
      )}
    </div>
  );
};

export default ProductSpecificationsForm;

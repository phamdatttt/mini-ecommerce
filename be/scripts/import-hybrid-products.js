/* eslint-disable no-console */
const {
  Product,
  Category,
  ProductAttribute,
  ProductVariant,
  ProductSpecification,
  OrderItem,
  CartItem,
  sequelize,
} = require('../src/models');
const { v4: uuidv4 } = require('uuid');

/* ====================== Helper: phân loại spec cho thời trang ====================== */
function getSpecificationCategory(specName) {
  const categories = {
    'Chất liệu & Vải': ['material', 'fabric', 'composition', 'lining', 'shell'],
    'Kích thước & Form': ['size', 'fit', 'cut', 'length', 'waist', 'hip', 'rise', 'hem'],
    'Màu sắc & Họa tiết': ['color', 'pattern', 'print'],
    'Thiết kế & Chi tiết': [
      'design','detail','neck','collar','sleeve','hood','zip','button','pocket','closure','strap'
    ],
    'Hướng dẫn bảo quản': ['care','wash','ironing','dry'],
    'Nguồn gốc & Bảo hành': ['origin','warranty','brand'],
    'Khác': ['season','collection','style'],
  };
  const lower = String(specName || '').toLowerCase();
  for (const [cat, keys] of Object.entries(categories)) {
    if (keys.some(k => lower.includes(k))) return cat;
  }
  return 'Thông số chung';
}

/* ====================== Helper: SKU slug ASCII (bỏ dấu, chuẩn hóa) ====================== */
function slugifyAscii(input) {
  return String(input || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toUpperCase();
}

/* ====================== DATASET THỜI TRANG “DÀY DẶN” ======================
   Lưu ý:
   - Mỗi sản phẩm có 6–12 biến thể (Size x Màu).
   - Ảnh dùng Unsplash place-holder (đủ lớn để FE đẹp).
   - Thuộc tính thống nhất: Size, Màu (có item thêm Chất liệu).
*/
const sampleProducts = [
  /* 1) Áo thun nam basic */
  {
  name: 'Áo thun nam basic',
  shortDescription: 'Cotton 100% 200gsm, thoáng mát, form regular',
  description: `
**Chất liệu**
- 100% Cotton
- Vải 220gsm dày dặn

**Kiểu dáng**
- Regular fit
- Phù hợp mặc hàng ngày
- Người mẫu: 186cm - 77kg, mặc áo 2XL

**Tính năng**
- Bề mặt vải mềm mịn và ít xù lông

**Cách giặt và bảo quản Áo thun nam Cotton 220gsm**
Để giữ gìn áo thun nam Cotton bền bỉ và giảm thiểu việc phai màu sau một thời gian sử dụng, chàng nên lưu ngay những mẹo giặt và bảo quản dưới đây.

*Giặt áo thun nam Cotton 220GSM:*
- Giặt áo ở nhiệt độ dưới 40 độ C để giữ màu áo không bị phai và hư hỏng
- Phân loại màu áo và không giặt chung với áo trắng để tránh phai màu
- Nếu áo bị bẩn, hãy ngâm với nước giặt trong 30 phút rồi vò nhẹ phần bị bẩn trước khi giặt
- Không sử dụng chất tẩy giặt quá mạnh

*Bảo quản áo thun nam Cotton 220GSM:*
- Tránh phơi áo trực tiếp dưới ánh nắng mặt trời
- Lộn trái áo trước khi phơi để tránh phai màu
- Gấp gọn hoặc treo nằm ngang trong tủ quần áo, tránh nơi ẩm mốc

**Câu hỏi thường gặp**
1. *Áo cotton có bị co rút, mất phom dáng sau nhiều lần giặt không?*  
   → Sản phẩm được xử lý công nghệ hiện đại, hạn chế tối đa sự co rút kích thước sau khi giặt giũ.

2. *Chất liệu cotton có đảm bảo an toàn cho làn da nhạy cảm không?*  
   → Cotton 100% nguyên chất là chất liệu hoàn toàn tự nhiên, thân thiện và an toàn cho mọi làn da.

3. *Áo có mau phai màu sau một thời gian sử dụng không?*  
   → Với công nghệ nhuộm hiện đại, màu sắc của áo được đảm bảo bền đẹp lâu dài.

4. *Áo thun cotton này có thấm hút mồ hôi tốt khi vận động không?*  
   → Chất liệu cotton tự nhiên có khả năng thấm hút mồ hôi rất tốt, luôn giữ cơ thể khô thoáng.
  `,
  price: 199000,
  compareAtPrice: 259000,
  thumbnail: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop',
  images: [
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=800&fit=crop',
  ],
  category: 'Thời trang nam',
  tags: ['tee','cotton','basic','regular'],
  status: 'active',
  featured: true,
  brand: 'Local Brand',
  model: 'TEE-BASIC-RT',
  condition: 'new',
  warrantyMonths: 1,
  specifications: {
    material: '100% Cotton 200gsm',
    color: 'Đen/Trắng/Xanh navy/Ghi',
    fit: 'Regular fit',
    care: 'Giặt máy nhẹ, ủi 110°C, không tẩy',
    origin: 'Việt Nam',
    design_detail: 'Cổ rib 1.2cm, may 2 kim',
  },
  attributes: [
    { name: 'Size', values: ['S','M','L','XL'] },
    { name: 'Màu', values: ['Đen','Trắng','Xanh navy','Ghi'] },
  ],
  variants: [
    { name: 'Đen - S', displayName: 'Đen / S', attributes: { Size:'S', Màu:'Đen' }, price:199000, stock:20, isDefault:true },
    { name: 'Đen - M', displayName: 'Đen / M', attributes: { Size:'M', Màu:'Đen' }, price:199000, stock:25 },
    { name: 'Đen - L', displayName: 'Đen / L', attributes: { Size:'L', Màu:'Đen' }, price:199000, stock:18 },
    { name: 'Trắng - M', displayName: 'Trắng / M', attributes: { Size:'M', Màu:'Trắng' }, price:199000, stock:22 },
    { name: 'Xanh navy - L', displayName: 'Xanh navy / L', attributes: { Size:'L', Màu:'Xanh navy' }, price:199000, stock:15 },
    { name: 'Ghi - XL', displayName: 'Ghi / XL', attributes: { Size:'XL', Màu:'Ghi' }, price:199000, stock:8 },
  ],
}


  /* 2) Sơ mi nam chống nhăn */
  {
    name: 'Sơ mi nam chống nhăn tay dài',
    shortDescription: 'Cotton + Spandex ít nhăn, form slim nhẹ',
    description: 'Sơ mi tay dài vải cotton pha spandex, co giãn nhẹ, ít nhăn. Phù hợp công sở.',
    price: 349000,
    compareAtPrice: 429000,
    thumbnail: 'https://images.unsplash.com/photo-1520975922284-2b77b9b3b6e5?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1520975922284-2b77b9b3b6e5?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=800&fit=crop',
    ],
    category: 'Thời trang nam',
    tags: ['shirt','office','anti-wrinkle','slim'],
    status: 'active',
    featured: true,
    brand: 'Local Brand',
    model: 'SHIRT-AW-SL',
    condition: 'new',
    warrantyMonths: 1,
    specifications: {
      material: 'Cotton 95% + Spandex 5%',
      color: 'Trắng/Xanh nhạt/Đen',
      fit: 'Slim fit nhẹ',
      collar: 'Cổ bẻ classic',
      care: 'Giặt máy 30°C, ủi 120°C',
      origin: 'Việt Nam',
    },
    attributes: [
      { name: 'Size', values: ['M','L','XL'] },
      { name: 'Màu', values: ['Trắng','Xanh nhạt','Đen'] },
    ],
    variants: [
      { name: 'Trắng - M', displayName: 'Trắng / M', attributes: { Size:'M', Màu:'Trắng' }, price:349000, stock:18, isDefault:true },
      { name: 'Xanh nhạt - L', displayName: 'Xanh nhạt / L', attributes: { Size:'L', Màu:'Xanh nhạt' }, price:349000, stock:12 },
      { name: 'Đen - XL', displayName: 'Đen / XL', attributes: { Size:'XL', Màu:'Đen' }, price:349000, stock:7 },
      { name: 'Trắng - L', displayName: 'Trắng / L', attributes: { Size:'L', Màu:'Trắng' }, price:349000, stock:14 },
      { name: 'Xanh nhạt - M', displayName: 'Xanh nhạt / M', attributes: { Size:'M', Màu:'Xanh nhạt' }, price:349000, stock:11 },
      { name: 'Đen - L', displayName: 'Đen / L', attributes: { Size:'L', Màu:'Đen' }, price:349000, stock:9 },
    ],
  },

  /* 3) Quần jeans nữ */
  {
    name: 'Quần jeans nữ lưng cao dáng straight',
    shortDescription: 'Denim co giãn nhẹ, hack chân, dễ phối',
    description: 'Jeans nữ high-waist dáng ống thẳng, co giãn nhẹ, thoải mái vận động.',
    price: 399000,
    compareAtPrice: 489000,
    thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1520975922284-2b77b9b3b6e5?w=800&h=800&fit=crop',
    ],
    category: 'Thời trang nữ',
    tags: ['jeans','high-waist','straight'],
    status: 'active',
    featured: true,
    brand: 'Local Brand',
    model: 'JEANS-HW-ST',
    condition: 'new',
    warrantyMonths: 1,
    specifications: {
      material: 'Denim 98% + Elastane 2%',
      color: 'Xanh nhạt/Đen',
      fit: 'High-waist, straight',
      length: 'Full length',
      closure: 'Khóa kéo + nút',
      care: 'Giặt riêng màu, không tẩy',
      origin: 'Việt Nam',
    },
    attributes: [
      { name: 'Size', values: ['S','M','L'] },
      { name: 'Màu', values: ['Xanh nhạt','Đen'] },
    ],
    variants: [
      { name: 'Xanh nhạt - S', displayName: 'Xanh nhạt / S', attributes: { Size:'S', Màu:'Xanh nhạt' }, price:399000, stock:14, isDefault:true },
      { name: 'Xanh nhạt - M', displayName: 'Xanh nhạt / M', attributes: { Size:'M', Màu:'Xanh nhạt' }, price:399000, stock:12 },
      { name: 'Xanh nhạt - L', displayName: 'Xanh nhạt / L', attributes: { Size:'L', Màu:'Xanh nhạt' }, price:399000, stock:10 },
      { name: 'Đen - S', displayName: 'Đen / S', attributes: { Size:'S', Màu:'Đen' }, price:399000, stock:11 },
      { name: 'Đen - M', displayName: 'Đen / M', attributes: { Size:'M', Màu:'Đen' }, price:399000, stock:10 },
      { name: 'Đen - L', displayName: 'Đen / L', attributes: { Size:'L', Màu:'Đen' }, price:399000, stock:9 },
    ],
  },

  /* 4) Đầm midi */
  {
    name: 'Đầm midi tay phồng cổ vuông',
    shortDescription: 'Voan chiffon lót polyester, nữ tính',
    description: 'Đầm midi tay phồng, cổ vuông, thân ôm nhẹ, chân váy xòe. Phù hợp đi làm/dạo phố.',
    price: 459000,
    compareAtPrice: 559000,
    thumbnail: 'https://images.unsplash.com/photo-1520975922284-2b77b9b3b6e5?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=800&fit=crop',
    ],
    category: 'Thời trang nữ',
    tags: ['dress','midi','voan'],
    status: 'active',
    featured: true,
    brand: 'Local Brand',
    model: 'DRESS-MIDI-SQ',
    condition: 'new',
    warrantyMonths: 1,
    specifications: {
      material: 'Voan chiffon + Lót polyester',
      color: 'Hồng phấn/Đen',
      fit: 'Waist-fitted, skirt A',
      length: 'Midi',
      care: 'Giặt tay nhẹ, treo khô',
      origin: 'Việt Nam',
    },
    attributes: [
      { name: 'Size', values: ['S','M','L'] },
      { name: 'Màu', values: ['Hồng phấn','Đen'] },
    ],
    variants: [
      { name: 'Hồng phấn - S', displayName: 'Hồng phấn / S', attributes: { Size:'S', Màu:'Hồng phấn' }, price:459000, stock:10, isDefault:true },
      { name: 'Hồng phấn - M', displayName: 'Hồng phấn / M', attributes: { Size:'M', Màu:'Hồng phấn' }, price:459000, stock:12 },
      { name: 'Hồng phấn - L', displayName: 'Hồng phấn / L', attributes: { Size:'L', Màu:'Hồng phấn' }, price:459000, stock:8 },
      { name: 'Đen - S', displayName: 'Đen / S', attributes: { Size:'S', Màu:'Đen' }, price:459000, stock:9 },
      { name: 'Đen - M', displayName: 'Đen / M', attributes: { Size:'M', Màu:'Đen' }, price:459000, stock:8 },
      { name: 'Đen - L', displayName: 'Đen / L', attributes: { Size:'L', Màu:'Đen' }, price:459000, stock:7 },
    ],
  },

  /* 5) Giày thể thao unisex */
  {
    name: 'Giày thể thao unisex đế EVA',
    shortDescription: 'Nhẹ, êm, thoáng; form true-to-size',
    description: 'Upper mesh thoáng khí, đế EVA êm ái, phù hợp đi bộ hằng ngày.',
    price: 499000,
    compareAtPrice: 599000,
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1528701800489-20be3c0da616?w=800&h=800&fit=crop',
    ],
    category: 'Giày dép',
    tags: ['sneaker','unisex','eva','mesh'],
    status: 'active',
    featured: true,
    brand: 'Local Brand',
    model: 'SNK-EVA-MESH',
    condition: 'new',
    warrantyMonths: 2,
    specifications: {
      material: 'Upper mesh + Đế EVA',
      color: 'Trắng/Đen/Xám',
      care: 'Chải khô, tránh ngâm lâu',
      origin: 'Việt Nam',
      pattern: 'Trơn',
    },
    attributes: [
      { name: 'Size', values: ['38','39','40','41','42'] },
      { name: 'Màu', values: ['Trắng','Đen','Xám'] },
    ],
    variants: [
      { name: 'Trắng - 40', displayName: 'Trắng / 40', attributes: { Size:'40', Màu:'Trắng' }, price:499000, stock:10, isDefault:true },
      { name: 'Đen - 41', displayName: 'Đen / 41', attributes: { Size:'41', Màu:'Đen' }, price:499000, stock:12 },
      { name: 'Trắng - 42', displayName: 'Trắng / 42', attributes: { Size:'42', Màu:'Trắng' }, price:499000, stock:6 },
      { name: 'Xám - 39', displayName: 'Xám / 39', attributes: { Size:'39', Màu:'Xám' }, price:499000, stock:9 },
      { name: 'Đen - 42', displayName: 'Đen / 42', attributes: { Size:'42', Màu:'Đen' }, price:499000, stock:7 },
      { name: 'Trắng - 38', displayName: 'Trắng / 38', attributes: { Size:'38', Màu:'Trắng' }, price:499000, stock:8 },
    ],
  },

  /* 6) Hoodie unisex */
  {
    name: 'Hoodie unisex nỉ chải lông 350gsm',
    shortDescription: 'Ấm, dày, mịn; bo gấu tay chắc chắn',
    description: 'Hoodie nỉ chải lông 350gsm, mũ 2 lớp, dây rút, túi kengaroo.',
    price: 399000,
    compareAtPrice: 499000,
    thumbnail: 'https://images.unsplash.com/photo-1520975922284-2b77b9b3b6e5?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1530021232320-687d8e3dba1e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=800&h=800&fit=crop'
    ],
    category: 'Thời trang nam',
    tags: ['hoodie','fleece','warm'],
    status: 'active',
    featured: true,
    brand: 'Local Brand',
    model: 'HD-350-FLC',
    condition: 'new',
    warrantyMonths: 1,
    specifications: {
      material: 'Nỉ chải lông 350gsm',
      color: 'Đen/Ghi/Nâu',
      fit: 'Oversize nhẹ',
      care: 'Giặt máy 30°C, lộn trái',
      origin: 'Việt Nam',
      hood: 'Mũ 2 lớp, dây rút',
    },
    attributes: [
      { name: 'Size', values: ['S','M','L','XL'] },
      { name: 'Màu', values: ['Đen','Ghi','Nâu'] },
    ],
    variants: [
      { name: 'Đen - M', displayName: 'Đen / M', attributes: { Size:'M', Màu:'Đen' }, price:399000, stock:20, isDefault:true },
      { name: 'Đen - L', displayName: 'Đen / L', attributes: { Size:'L', Màu:'Đen' }, price:399000, stock:18 },
      { name: 'Ghi - L', displayName: 'Ghi / L', attributes: { Size:'L', Màu:'Ghi' }, price:399000, stock:12 },
      { name: 'Nâu - M', displayName: 'Nâu / M', attributes: { Size:'M', Màu:'Nâu' }, price:399000, stock:11 },
      { name: 'Ghi - XL', displayName: 'Ghi / XL', attributes: { Size:'XL', Màu:'Ghi' }, price:399000, stock:7 },
      { name: 'Đen - S', displayName: 'Đen / S', attributes: { Size:'S', Màu:'Đen' }, price:399000, stock:8 },
    ],
  },

  /* 7) Áo khoác gió */
  {
    name: 'Áo khoác gió nam chống nước nhẹ',
    shortDescription: 'Vải dù chống thấm nhẹ, mũ trùm, khóa YKK',
    description: 'Áo khoác gió mỏng nhẹ, chống gió, chống nước nhẹ, tiện di chuyển.',
    price: 459000,
    compareAtPrice: 579000,
    thumbnail: 'https://images.unsplash.com/photo-1542060748-10c28b62716a?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542060748-10c28b62716a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=800&fit=crop',
    ],
    category: 'Thời trang nam',
    tags: ['windbreaker','water-repellent'],
    status: 'active',
    featured: false,
    brand: 'Local Brand',
    model: 'WB-LITE-DRP',
    condition: 'new',
    warrantyMonths: 1,
    specifications: {
      material: 'Polyester dù, lót lưới',
      color: 'Đen/Xanh rêu',
      care: 'Lau ẩm, giặt tay nhẹ',
      origin: 'Việt Nam',
      zipper: 'Khóa YKK',
    },
    attributes: [
      { name: 'Size', values: ['M','L','XL'] },
      { name: 'Màu', values: ['Đen','Xanh rêu'] },
    ],
    variants: [
      { name: 'Đen - M', displayName: 'Đen / M', attributes: { Size:'M', Màu:'Đen' }, price:459000, stock:16, isDefault:true },
      { name: 'Đen - L', displayName: 'Đen / L', attributes: { Size:'L', Màu:'Đen' }, price:459000, stock:12 },
      { name: 'Đen - XL', displayName: 'Đen / XL', attributes: { Size:'XL', Màu:'Đen' }, price:459000, stock:9 },
      { name: 'Xanh rêu - L', displayName: 'Xanh rêu / L', attributes: { Size:'L', Màu:'Xanh rêu' }, price:459000, stock:10 },
      { name: 'Xanh rêu - XL', displayName: 'Xanh rêu / XL', attributes: { Size:'XL', Màu:'Xanh rêu' }, price:459000, stock:7 },
      { name: 'Xanh rêu - M', displayName: 'Xanh rêu / M', attributes: { Size:'M', Màu:'Xanh rêu' }, price:459000, stock:8 },
    ],
  },

  /* 8) Chân váy chữ A */
  {
    name: 'Chân váy chữ A lưng cao',
    shortDescription: 'Dáng A tôn dáng, dễ phối áo',
    description: 'Chân váy chữ A lưng cao, chất liệu dày dặn đứng dáng, khoá kéo sau.',
    price: 299000,
    compareAtPrice: 369000,
    thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=800&fit=crop'
    ],
    category: 'Thời trang nữ',
    tags: ['skirt','a-line','high-waist'],
    status: 'active',
    featured: false,
    brand: 'Local Brand',
    model: 'SK-A-HW',
    condition: 'new',
    warrantyMonths: 1,
    specifications: {
      material: 'Poly + Rayon',
      color: 'Đen/Be',
      fit: 'A-line',
      care: 'Giặt tay nhẹ, treo khô',
      origin: 'Việt Nam',
      closure: 'Khóa kéo sau',
    },
    attributes: [
      { name: 'Size', values: ['S','M','L'] },
      { name: 'Màu', values: ['Đen','Be'] },
    ],
    variants: [
      { name: 'Đen - S', displayName: 'Đen / S', attributes: { Size:'S', Màu:'Đen' }, price:299000, stock:12, isDefault:true },
      { name: 'Đen - M', displayName: 'Đen / M', attributes: { Size:'M', Màu:'Đen' }, price:299000, stock:11 },
      { name: 'Đen - L', displayName: 'Đen / L', attributes: { Size:'L', Màu:'Đen' }, price:299000, stock:9 },
      { name: 'Be - S', displayName: 'Be / S', attributes: { Size:'S', Màu:'Be' }, price:299000, stock:10 },
      { name: 'Be - M', displayName: 'Be / M', attributes: { Size:'M', Màu:'Be' }, price:299000, stock:9 },
      { name: 'Be - L', displayName: 'Be / L', attributes: { Size:'L', Màu:'Be' }, price:299000, stock:7 },
    ],
  },

  /* 9) Áo polo */
  {
    name: 'Áo polo nam thoáng khí',
    shortDescription: 'Poly-cotton, cổ bo, thoát mồ hôi tốt',
    description: 'Áo polo phối sợi thoáng khí, giữ form chuẩn trong suốt quá trình sử dụng, hạn chế nhăn nhàu và dễ dàng giặt ủi. Thiết kế đơn giản nhưng tinh tế, phù hợp cả đi làm, đi học hay dạo phố.',
    price: 259000,
    compareAtPrice: 329000,
    thumbnail: 'https://images.unsplash.com/photo-1530021232320-687d8e3dba1e?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=800&fit=crop'
    ],
    category: 'Thời trang nam',
    tags: ['polo','breathable'],
    status: 'active',
    featured: false,
    brand: 'Local Brand',
    model: 'POLO-COOL-DRY',
    condition: 'new',
    warrantyMonths: 1,
    specifications: {
      material: 'Poly 60% + Cotton 40%',
      color: 'Trắng/Đen/Xanh dương',
      fit: 'Regular',
      care: 'Giặt máy 30°C',
      origin: 'Việt Nam',
      collar: 'Bo cổ chống dão',
    },
    attributes: [
      { name: 'Size', values: ['S','M','L','XL'] },
      { name: 'Màu', values: ['Trắng','Đen','Xanh dương'] },
    ],
    variants: [
      { name: 'Trắng - M', displayName: 'Trắng / M', attributes: { Size:'M', Màu:'Trắng' }, price:259000, stock:20, isDefault:true },
      { name: 'Đen - L', displayName: 'Đen / L', attributes: { Size:'L', Màu:'Đen' }, price:259000, stock:17 },
      { name: 'Xanh dương - M', displayName: 'Xanh dương / M', attributes: { Size:'M', Màu:'Xanh dương' }, price:259000, stock:14 },
      { name: 'Trắng - S', displayName: 'Trắng / S', attributes: { Size:'S', Màu:'Trắng' }, price:259000, stock:10 },
      { name: 'Đen - XL', displayName: 'Đen / XL', attributes: { Size:'XL', Màu:'Đen' }, price:259000, stock:9 },
      { name: 'Xanh dương - L', displayName: 'Xanh dương / L', attributes: { Size:'L', Màu:'Xanh dương' }, price:259000, stock:8 },
    ],
  },

  /* 10) Dép quai ngang */
  {
    name: 'Dép quai ngang EVA siêu nhẹ',
    shortDescription: 'Êm chân, chống trơn, đi mưa tốt',
    description: 'Dép EVA đúc khuôn, bám đường, êm chân, tiện đi mưa/đi bộ.',
    price: 149000,
    compareAtPrice: 189000,
    thumbnail: 'https://images.unsplash.com/photo-1528701800489-20be3c0da616?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1528701800489-20be3c0da616?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop'
    ],
    category: 'Giày dép',
    tags: ['slides','eva','lightweight'],
    status: 'active',
    featured: false,
    brand: 'Local Brand',
    model: 'SLIDE-EVA-LT',
    condition: 'new',
    warrantyMonths: 1,
    specifications: {
      material: 'EVA đúc',
      color: 'Đen/Xám/Xanh navy',
      care: 'Rửa nước sạch, phơi mát',
      origin: 'Việt Nam',
      pattern: 'Gân chống trượt',
    },
    attributes: [
      { name: 'Size', values: ['39','40','41','42','43'] },
      { name: 'Màu', values: ['Đen','Xám','Xanh navy'] },
    ],
    variants: [
      { name: 'Đen - 41', displayName: 'Đen / 41', attributes: { Size:'41', Màu:'Đen' }, price:149000, stock:20, isDefault:true },
      { name: 'Đen - 42', displayName: 'Đen / 42', attributes: { Size:'42', Màu:'Đen' }, price:149000, stock:17 },
      { name: 'Xám - 40', displayName: 'Xám / 40', attributes: { Size:'40', Màu:'Xám' }, price:149000, stock:14 },
      { name: 'Xanh navy - 43', displayName: 'Xanh navy / 43', attributes: { Size:'43', Màu:'Xanh navy' }, price:149000, stock:9 },
      { name: 'Xám - 42', displayName: 'Xám / 42', attributes: { Size:'42', Màu:'Xám' }, price:149000, stock:8 },
      { name: 'Xanh navy - 41', displayName: 'Xanh navy / 41', attributes: { Size:'41', Màu:'Xanh navy' }, price:149000, stock:11 },
    ],
  },

  /* 11) Túi tote canvas */
  {
    name: 'Túi tote canvas dày 16oz',
    shortDescription: 'Đựng laptop 13", in logo custom',
    description: 'Túi tote canvas dày dặn, quai bản to, chịu lực tốt, tiện đi học/đi làm.',
    price: 199000,
    compareAtPrice: 249000,
    thumbnail: 'https://images.unsplash.com/photo-1520975922284-2b77b9b3b6e5?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=800&h=800&fit=crop'
    ],
    category: 'Thời trang nữ',
    tags: ['tote','canvas','bag'],
    status: 'active',
    featured: false,
    brand: 'Local Brand',
    model: 'TOTE-16OZ',
    condition: 'new',
    warrantyMonths: 1,
    specifications: {
      material: 'Canvas 16oz',
      color: 'Be/Đen',
      size: '34x38x8 cm',
      care: 'Giặt tay, không tẩy',
      origin: 'Việt Nam',
      pocket: '1 ngăn phụ trong',
    },
    attributes: [
      { name: 'Màu', values: ['Be','Đen'] },
      { name: 'Chất liệu', values: ['Canvas 16oz'] },
    ],
    variants: [
      { name: 'Be', displayName: 'Be', attributes: { Màu:'Be', 'Chất liệu':'Canvas 16oz' }, price:199000, stock:25, isDefault:true },
      { name: 'Đen', displayName: 'Đen', attributes: { Màu:'Đen', 'Chất liệu':'Canvas 16oz' }, price:199000, stock:22 },
    ],
  },

  /* 12) Nón cap */
  {
    name: 'Nón cap cotton logo thêu',
    shortDescription: 'Form unisex, điều chỉnh sau đầu',
    description: 'Nón cap chất cotton dày, thấm hút tốt, khoá gài kim loại.',
    price: 159000,
    compareAtPrice: 199000,
    thumbnail: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=800&h=800&fit=crop'
    ],
    category: 'Thời trang nam',
    tags: ['cap','hat','cotton'],
    status: 'active',
    featured: false,
    brand: 'Local Brand',
    model: 'CAP-CTN-EMB',
    condition: 'new',
    warrantyMonths: 1,
    specifications: {
      material: 'Cotton dày',
      color: 'Đen/Trắng/Navy',
      care: 'Lau ẩm, không ngâm',
      origin: 'Việt Nam',
      strap: 'Điều chỉnh kim loại',
    },
    attributes: [
      { name: 'Màu', values: ['Đen','Trắng','Navy'] },
      { name: 'Size', values: ['Freesize'] },
    ],
    variants: [
      { name: 'Đen - Freesize', displayName: 'Đen / Freesize', attributes: { Màu:'Đen', Size:'Freesize' }, price:159000, stock:30, isDefault:true },
      { name: 'Trắng - Freesize', displayName: 'Trắng / Freesize', attributes: { Màu:'Trắng', Size:'Freesize' }, price:159000, stock:26 },
      { name: 'Navy - Freesize', displayName: 'Navy / Freesize', attributes: { Màu:'Navy', Size:'Freesize' }, price:159000, stock:22 },
    ],
  },
];

/* ====================== SEED ====================== */
async function importProducts() {
  try {
    console.log('🚀 Bắt đầu import sản phẩm thời trang...');

    // Xóa dữ liệu cũ theo thứ tự để tránh foreign key constraint
    await OrderItem.destroy({ where: {} });
    await CartItem.destroy({ where: {} });
    await ProductVariant.destroy({ where: {} });
    await ProductAttribute.destroy({ where: {} });
    await ProductSpecification.destroy({ where: {} });
    await Product.destroy({ where: {} });
    await Category.destroy({ where: {} });

    console.log('🗑️ Đã xóa dữ liệu cũ');

    // Tạo categories
    const categories = [
      { name: 'Thời trang nữ', slug: 'thoi-trang-nu', description: 'Thời trang dành cho phụ nữ' },
      { name: 'Thời trang nam', slug: 'thoi-trang-nam', description: 'Thời trang dành cho nam giới' },
      { name: 'Giày dép', slug: 'giay-dep', description: 'Giày dép thời trang' },
      { name: 'Phụ kiện', slug: 'phu-kien', description: 'Phụ kiện thời trang' }, // giữ để tương thích
    ];

    await Category.bulkCreate(categories);
    // Lấy lại để chắc có id (nếu DB không returning)
    const createdCategories = await Category.findAll();
    console.log(`📁 Đã tạo ${createdCategories.length} danh mục`);

    // Tạo products
    for (const productData of sampleProducts) {
      const category = createdCategories.find((cat) => cat.name === productData.category);

      const product = await Product.create({
        name: productData.name,
        description: productData.description,
        shortDescription: productData.shortDescription,
        price: productData.price,
        compareAtPrice: productData.compareAtPrice,
        images: productData.images,
        thumbnail: productData.thumbnail,
        inStock: true,
        stockQuantity: 0, // sẽ cập nhật sau
        sku: `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        status: productData.status,
        featured: productData.featured,
        searchKeywords: productData.tags,
        seoTitle: productData.name,
        seoDescription: productData.shortDescription,
        seoKeywords: productData.tags,
        specifications: productData.specifications || {},
        condition: productData.condition || 'new',
        baseName: productData.name,
        isVariantProduct: true,
        brand: productData.brand || null,
        model: productData.model || null,
        warrantyMonths: productData.warrantyMonths ?? 0,
      });

      if (category && product.setCategories) {
        await product.setCategories([category]); // N-N
      } else if (category && product.setCategory) {
        await product.setCategory(category); // 1-N
      }

      // Specs
      const createdSpecifications = [];
      if (productData.specifications) {
        let sortOrder = 0;
        for (const [specName, specValue] of Object.entries(productData.specifications)) {
          const specification = await ProductSpecification.create({
            productId: product.id,
            name: specName,
            value: specValue,
            category: getSpecificationCategory(specName),
            sortOrder: sortOrder++,
          });
          createdSpecifications.push(specification);
        }
      }

      // Attributes
      const createdAttributes = [];
      for (const attr of productData.attributes) {
        const attribute = await ProductAttribute.create({
          productId: product.id,
          name: attr.name,
          values: attr.values,
        });
        createdAttributes.push(attribute);
      }

      // Variants
      const createdVariants = [];
      for (const variant of productData.variants) {
        const attrSlug = Object.values(variant.attributes).map(v => slugifyAscii(String(v))).join('-');
        const variantSku = `${product.sku}-${attrSlug}`;

        const productVariant = await ProductVariant.create({
          productId: product.id,
          name: variant.name,
          sku: variantSku,
          attributes: variant.attributes,
          price: variant.price,
          stockQuantity: variant.stock || 0,
          images: variant.images || [],
          displayName: variant.displayName || variant.name,
          isDefault: !!variant.isDefault,
          isAvailable: (variant.stock || 0) > 0,
          compareAtPrice: variant.compareAtPrice || null,
          specifications: variant.specifications || {},
        });
        createdVariants.push(productVariant);
      }

      // Update tổng stock
      const totalStock = createdVariants.reduce((sum, v) => sum + (v.stockQuantity || 0), 0);
      await product.update({ stockQuantity: totalStock, inStock: totalStock > 0 });

      console.log(`✅ ${product.name} — specs:${createdSpecifications.length}, attrs:${createdAttributes.length}, variants:${createdVariants.length}, stock:${totalStock}`);
    }

    console.log('🎉 Import thành công!');
    console.log('📊 Tổng kết:');
    console.log(`   - ${sampleProducts.length} sản phẩm`);
    console.log(`   - ${createdCategories.length} danh mục`);
    console.log(`   - Tổng variants: ${sampleProducts.reduce((s, p) => s + p.variants.length, 0)}`);
  } catch (error) {
    console.error('❌ Lỗi import:', error);
  }
}

// Chạy import
importProducts()
  .then(() => {
    console.log('🏁 Hoàn tất import');
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

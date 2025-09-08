// menu.js
// Key lưu trong localStorage: "hoa_tim_menu_v1"
// Nếu muốn reset về mặc định, admin có nút reset.

const DEFAULT_MENU = {
  "Café": [
    { id: "cf-den", name: "Café Đen", price: "15k", available: true, img: "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=800&auto=format&fit=crop&crop=faces" },
    { id: "cf-sua", name: "Café Sữa Đá", price: "20k", available: true, img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop&crop=faces" },
    { id: "cacao-sua", name: "Cacao Sữa", price: "28k", available: true, img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop&crop=faces" },
    { id: "cacao-da", name: "Cacao Đá", price: "25k", available: true, img: "" },
    { id: "chanh-day", name: "Chanh Dây", price: "25k", available: true, img: "" },
    { id: "chanh-tuoi", name: "Chanh Tươi", price: "15k", available: true, img: "" },
    { id: "chanh-muoi", name: "Chanh Muối", price: "20k", available: true, img: "" },
    { id: "da-me", name: "Đá Me", price: "20k", available: true, img: "" },
    { id: "da-me-sua", name: "Đá Me Sữa", price: "25k", available: true, img: "" },
    { id: "dua-tuoi", name: "Dừa Tươi", price: "20k", available: true, img: "" },
    { id: "rau-ma", name: "Rau Má", price: "20k", available: true, img: "" },
    { id: "rau-ma-sua", name: "Rau Má Sữa", price: "25k", available: true, img: "" }
  ],
  "Trà": [
    { id: "lipton", name: "Lipton", price: "20k", available: true, img: "" },
    { id: "lipton-sua", name: "Lipton Sữa", price: "25k", available: true, img: "" },
    { id: "tra-duong", name: "Trà Đường", price: "15k", available: true, img: "" },
    { id: "tra-tac", name: "Trà Tắc", price: "20k", available: true, img: "" },
    { id: "tra-oi", name: "Trà Ổi", price: "28k", available: true, img: "" },
    { id: "tra-dau", name: "Trà Dâu", price: "28k", available: true, img: "" },
    { id: "tra-vai", name: "Trà Vải", price: "28k", available: true, img: "" },
    { id: "tra-mang-cau", name: "Trà Mãng Cầu", price: "30k", available: true, img: "" }
  ],
  "Nước Ngọt": [
    { id: "pepsi", name: "Pepsi", price: "18k", available: true, img: "" },
    { id: "7up", name: "7UP", price: "18k", available: true, img: "" },
    { id: "sting", name: "Sting", price: "18k", available: true, img: "" },
    { id: "mirinda", name: "Mirinda Kem", price: "18k", available: true, img: "" },
    { id: "0do", name: "0 Độ", price: "18k", available: true, img: "" },
    { id: "olong", name: "Ôlong", price: "18k", available: true, img: "" },
    { id: "bo-cung", name: "Bò Cụng", price: "20k", available: true, img: "" },
    { id: "nuoc-suoi", name: "Nước Suối", price: "10k", available: true, img: "" }
  ],
  "Soda": [
    { id: "soda-dau", name: "Soda Dâu", price: "25k", available: true, img: "" },
    { id: "soda-vietquat", name: "Soda Việt Quất", price: "25k", available: true, img: "" },
    { id: "soda-blue", name: "Soda Blue", price: "25k", available: true, img: "" },
    { id: "soda-dao", name: "Soda Đào", price: "25k", available: true, img: "" },
    { id: "soda-oi-hong", name: "Soda Ổi Hồng", price: "25k", available: true, img: "" }
  ],
  "Sinh Tố": [
    { id: "st-dau", name: "Sinh Tố Dâu", price: "30k", available: true, img: "" },
    { id: "st-vietquat", name: "Sinh Tố Việt Quất", price: "30k", available: true, img: "" },
    { id: "st-duahau", name: "Sinh Tố Dưa Hấu", price: "30k", available: true, img: "" }
  ],
  "Nước Ép": [
    { id: "ne-cam", name: "Cam Ép", price: "25k", available: true, img: "" },
    { id: "ne-tao", name: "Táo", price: "30k", available: true, img: "" },
    { id: "ne-thom", name: "Thơm", price: "30k", available: true, img: "" },
    { id: "ne-ca-rot", name: "Cà Rốt", price: "30k", available: true, img: "" },
    { id: "ne-ca-chua", name: "Cà Chua", price: "30k", available: true, img: "" },
    { id: "ne-duahau", name: "Dưa Hấu", price: "30k", available: true, img: "" }
  ],
  "Trà Sữa": [
    { id: "ts-truyen-thong", name: "Trà Sữa Truyền Thống", price: "20k / 25k (M/L)", available: true, img: "" },
    { id: "ts-matcha", name: "Trà Sữa Matcha", price: "25k / 30k (M/L)", available: true, img: "" },
    { id: "ts-thai", name: "Trà Sữa Thái", price: "25k / 30k (M/L)", available: true, img: "" },
    { id: "ts-dau", name: "Trà Sữa Dâu", price: "25k / 30k (M/L)", available: true, img: "" },
    { id: "ts-dao", name: "Trà Đào", price: "20k / 28k (M/L)", available: true, img: "" }
  ],
  "Yaourt": [
    { id: "y-dau-dam", name: "Yaourt Dâu Dằm", price: "28k", available: true, img: "" },
    { id: "y-hat-dat", name: "Yaourt Hạt Dát", price: "30k", available: true, img: "" },
    { id: "y-kiwi", name: "Yaourt Kiwi", price: "28k", available: true, img: "" },
    { id: "y-dao", name: "Yaourt Đào", price: "28k", available: true, img: "" },
    { id: "y-vietquat", name: "Yaourt Việt Quất", price: "28k", available: true, img: "" },
    { id: "y-xoai", name: "Yaourt Xoài", price: "28k", available: true, img: "" }
  ],
  "Khác": [
    { id: "kem-dua", name: "Kem Dừa", price: "30k", available: true, img: "" },
    { id: "trai-cay-dia", name: "Trái Cây Dĩa", price: "35k", available: true, img: "" }
  ],
  "Đồ Ăn Chay": [
    { id: "mi-cay-chay", name: "Mì Cay Chay", price: "25k / 30k / 35k", available: true, img: "https://images.unsplash.com/photo-1604908177545-3a7da3a7f42b?q=80&w=800&auto=format&fit=crop&crop=faces" },
    { id: "cha-gio", name: "Chả Giò Chiên", price: "20k", available: true, img: "" },
    { id: "met-bun-dau", name: "Mẹt Bún Đậu Chay", price: "39k / 79k", available: true, img: "" },
    { id: "banh-xeo-chay", name: "Bánh Xèo Chay", price: "15k / 20k", available: true, img: "" },
    { id: "lau-chay", name: "Lẩu Chay", price: "69k / 99k / 149k / 199k", available: true, img: "" },
    { id: "goi-cuon-chay", name: "Gỏi Cuốn Chay", price: "25k / cái", available: true, img: "" }
  ]
};

// helper to get/save
const STORAGE_KEY = "hoa_tim_menu_v1";
function loadMenuData(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_MENU;
  }catch(e){
    console.error("loadMenuData", e);
    return DEFAULT_MENU;
  }
}
function saveMenuData(data){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

import { n as __toESM } from "../_runtime.mjs";
import {
  n as require_jsx_runtime,
  r as require_react,
} from "../_libs/react+tanstack__react-query.mjs";
import {
  c as isDuplicateLead,
  d as saveLead,
  h as useSiteConfig,
  p as trackConversion,
  r as LEAD_CREATED_EVENT,
  u as loadLeads,
} from "./use-site-config-Bf44Q8nb.mjs";
import {
  p as Phone,
  v as MessageCircle,
  w as GraduationCap,
} from "../_libs/lucide-react.mjs";
import {
  n as ScarcityBar,
  t as ContentSection,
} from "./ContentSection-BVP0UsCM.mjs";
import {
  d as utmSource,
  i as getVariant,
  l as trackFormStart,
  n as dispatchLead,
  o as sendLeadEmail,
  u as trackLead,
} from "./ab-1ZHA4A9t.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Urhj0j4j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var expert_1_default = "/assets/expert-1-CcX0y7YN.webp";
var expert_2_default = "/assets/expert-2-WVJni1up.webp";
var expert_3_default = "/assets/expert-3-AK2LvN4J.webp";
var isBrowser = () => typeof window !== "undefined";
var state = {
  started: 0,
  firstInteraction: 0,
  formStart: 0,
  maxScroll: 0,
  industrySwitch: 0,
  faqClicked: "",
  copiedTextType: "",
  isCopyPaste: false,
  startBattery: null,
  currentBattery: null,
  ip: "",
  city: "",
  sectionTime: {},
  visible: {},
  initialized: false,
};
var dayKey = () => /* @__PURE__ */ new Date().toISOString().slice(0, 10);
var monthKey = () => /* @__PURE__ */ new Date().toISOString().slice(0, 7);
function readJSON(key, fallback) {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function writeJSON(key, value) {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}
function detectDevice() {
  if (!isBrowser())
    return {
      model: "Unknown",
      os: "Unknown",
      browser: "Unknown",
    };
  const ua = navigator.userAgent;
  let os = "Unknown";
  if (/Windows NT/.test(ua)) os = "Windows";
  else if (/Android/.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/.test(ua)) os = /iPad/.test(ua) ? "iPadOS" : "iOS";
  else if (/Mac OS X/.test(ua)) os = "macOS";
  else if (/Linux/.test(ua)) os = "Linux";
  let browser = "Khác";
  if (/Edg\//.test(ua)) browser = "Edge";
  else if (/OPR\/|Opera/.test(ua)) browser = "Opera";
  else if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) browser = "Chrome";
  else if (/Safari\//.test(ua) && /Version\//.test(ua)) browser = "Safari";
  else if (/Firefox\//.test(ua)) browser = "Firefox";
  if (/FBAN|FBAV/.test(ua)) browser = "Facebook In-App";
  if (/TikTok|BytedanceWebview/i.test(ua)) browser = "TikTok In-App";
  if (/Zalo/i.test(ua)) browser = "Zalo In-App";
  let model = os;
  const android = ua.match(/Android\s[\d.]+;\s([^;)]+)/);
  if (android?.[1]) model = android[1].replace(/Build\/.*/, "").trim();
  else if (/iPhone/.test(ua)) {
    const w = Math.max(screen.width, screen.height);
    const dpr = window.devicePixelRatio || 2;
    if (w >= 932) model = "iPhone Pro Max (15/16)";
    else if (w >= 926) model = "iPhone Pro Max (12/13/14)";
    else if (w >= 896) model = "iPhone XR/11/XS Max";
    else if (w >= 852) model = "iPhone 14/15/16 Pro";
    else if (w >= 844) model = "iPhone 12/13/14";
    else if (w >= 812) model = "iPhone X/XS/11 Pro";
    else model = dpr >= 3 ? "iPhone Plus" : "iPhone SE/8";
  } else if (/iPad/.test(ua)) model = "iPad";
  else if (os === "Windows") model = "PC Windows";
  else if (os === "macOS") model = "Mac";
  return {
    model,
    os,
    browser,
  };
}
function isHeadless() {
  if (!isBrowser()) return false;
  return Boolean(
    navigator.webdriver ||
    /HeadlessChrome|Puppeteer|Playwright|PhantomJS/i.test(
      navigator.userAgent,
    ) ||
    (navigator.languages && navigator.languages.length === 0),
  );
}
function connectionType() {
  if (!isBrowser()) return "";
  const c = navigator.connection;
  return c?.effectiveType ? c.effectiveType.toUpperCase() : "";
}
function utm() {
  if (!isBrowser())
    return {
      source: "",
      medium: "",
      campaign: "",
      content: "",
      ttclid: "",
    };
  const stored = readJSON("lp_utm", {});
  const p = new URLSearchParams(window.location.search);
  const pick = (k) => p.get(k) || stored[k] || "";
  const data = {
    source: pick("utm_source"),
    medium: pick("utm_medium"),
    campaign: pick("utm_campaign"),
    content: pick("utm_content"),
    ttclid: pick("ttclid"),
  };
  if (p.toString())
    writeJSON("lp_utm", {
      utm_source: data.source,
      utm_medium: data.medium,
      utm_campaign: data.campaign,
      utm_content: data.content,
      ttclid: data.ttclid,
    });
  return data;
}
function bumpVisitCounters() {
  if (!isBrowser())
    return {
      today: 0,
      month: 0,
    };
  const d = readJSON("lp_visits_day", {
    key: dayKey(),
    count: 0,
  });
  const m = readJSON("lp_visits_month", {
    key: monthKey(),
    count: 0,
  });
  const today = d.key === dayKey() ? d.count + 1 : 1;
  const month = m.key === monthKey() ? m.count + 1 : 1;
  writeJSON("lp_visits_day", {
    key: dayKey(),
    count: today,
  });
  writeJSON("lp_visits_month", {
    key: monthKey(),
    count: month,
  });
  return {
    today,
    month,
  };
}
function bumpIpVisits(ip) {
  if (!ip) return 0;
  const store = readJSON("lp_ip_visits", {
    key: dayKey(),
    map: {},
  });
  const map = store.key === dayKey() ? store.map : {};
  map[ip] = (map[ip] || 0) + 1;
  writeJSON("lp_ip_visits", {
    key: dayKey(),
    map,
  });
  return map[ip];
}
function bumpSubmissionCount(ip) {
  if (!isBrowser()) return 1;
  const key = ip || "unknown";
  const store = readJSON("lp_submits", {
    key: dayKey(),
    map: {},
  });
  const map = store.key === dayKey() ? store.map : {};
  map[key] = (map[key] || 0) + 1;
  writeJSON("lp_submits", {
    key: dayKey(),
    map,
  });
  return map[key];
}
function initBehavior() {
  if (!isBrowser() || state.initialized) return () => {};
  state.initialized = true;
  state.started = Date.now();
  const markInteraction = () => {
    if (!state.firstInteraction) state.firstInteraction = Date.now();
  };
  const onScroll = () => {
    markInteraction();
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct =
      total > 0 ? Math.round(((window.scrollY || 0) / total) * 100) : 100;
    state.maxScroll = Math.min(100, Math.max(state.maxScroll, pct));
  };
  const events = [
    ["scroll", onScroll],
    ["pointerdown", markInteraction],
    ["keydown", markInteraction],
  ];
  events.forEach(([n, h]) => window.addEventListener(n, h, { passive: true }));
  onScroll();
  let observer;
  const tick = window.setInterval(() => {
    Object.keys(state.visible).forEach((name) => {
      if (state.visible[name])
        state.sectionTime[name] = (state.sectionTime[name] || 0) + 1;
    });
  }, 1e3);
  if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          const name = en.target.dataset["section"];
          if (name)
            state.visible[name] =
              en.isIntersecting && en.intersectionRatio > 0.4 ? 1 : 0;
        });
      },
      { threshold: [0, 0.4, 0.8] },
    );
    document
      .querySelectorAll("[data-section]")
      .forEach((el) => observer?.observe(el));
  }
  navigator
    .getBattery?.()
    .then((bat) => {
      state.startBattery = Math.round(bat.level * 100);
      state.currentBattery = state.startBattery;
      bat.addEventListener("levelchange", () => {
        state.currentBattery = Math.round(bat.level * 100);
      });
    })
    .catch(() => {});
  fetch("https://ipwho.is/")
    .then((r) => r.json())
    .then((j) => {
      if (j?.ip) {
        state.ip = j.ip;
        state.city = j.city || "";
        bumpIpVisits(j.ip);
      }
    })
    .catch(() => {});
  return () => {
    events.forEach(([n, h]) => window.removeEventListener(n, h));
    window.clearInterval(tick);
    observer?.disconnect();
  };
}
var markFormStart = () => {
  if (!state.formStart) state.formStart = Date.now();
  if (!state.firstInteraction) state.firstInteraction = Date.now();
};
var markIndustrySwitch = () => {
  state.industrySwitch += 1;
};
var markFaqClick = (slug) => {
  state.faqClicked = slug;
};
var markCopyPaste = (type = "sdt") => {
  state.isCopyPaste = true;
  state.copiedTextType = type;
};
function getIpSnapshot() {
  const store = readJSON("lp_ip_visits", {
    key: dayKey(),
    map: {},
  });
  const visits =
    store.key === dayKey() && state.ip ? store.map[state.ip] || 0 : 0;
  return {
    ip: state.ip,
    city: state.city,
    visitsToday: visits,
  };
}
function collectBehavior(form) {
  const now = Date.now();
  const dev = detectDevice();
  const u = utm();
  const focus =
    Object.entries(state.sectionTime).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "";
  const submissionCount = bumpSubmissionCount(state.ip);
  return {
    time_on_page_seconds: Math.round((now - state.started) / 1e3),
    time_to_first_interaction_seconds: state.firstInteraction
      ? Math.round((state.firstInteraction - state.started) / 1e3)
      : 0,
    form_fill_duration_seconds: state.formStart
      ? Math.round((now - state.formStart) / 1e3)
      : 0,
    scroll_depth_percent: state.maxScroll,
    industry_switch_count: Math.max(0, state.industrySwitch - 1),
    focus_section: focus,
    faq_clicked: state.faqClicked,
    copied_text_type: state.copiedTextType,
    is_copy_paste: state.isCopyPaste,
    is_headless_browser: isHeadless(),
    submission_count_same_ip: submissionCount,
    device_model_name: dev.model,
    operating_system: dev.os,
    browser: dev.browser,
    connection_type: connectionType(),
    start_battery_level: state.startBattery,
    current_battery_level: state.currentBattery,
    battery_drain:
      state.startBattery != null && state.currentBattery != null
        ? Math.max(0, state.startBattery - state.currentBattery)
        : 0,
    client_ip: state.ip,
    location_city: state.city,
    form_city: form.city,
    nganh_hoc: form.major,
    utm_source: u.source,
    utm_medium: u.medium,
    utm_campaign: u.campaign,
    utm_content: u.content,
    ttclid: u.ttclid,
  };
}
/**
 * Chấm điểm & phân hạng lead từ hành vi vi mô + cấu hình AI Advisor.
 * Trả về điểm 0-100 và nhãn phân hạng để lưu Mini-CRM và chèn vào email.
 */
function scoreLead(data, cfg) {
  const fastFill = cfg?.fastFillThresholdSec ?? 4;
  const vipTime = cfg?.vipTimeOnPageSec ?? 80;
  const vipScroll = cfg?.vipScrollPercent ?? 70;
  if (
    data.is_headless_browser ||
    data.form_fill_duration_seconds < fastFill ||
    data.submission_count_same_ip > 1
  )
    return {
      score: 5,
      rank: "Bot / Ảo",
    };
  let score = 45;
  const safe = (re) => {
    if (!re) return null;
    try {
      return new RegExp(re, "i");
    } catch {
      return null;
    }
  };
  const vipDevice =
    safe(cfg?.vipDeviceRegex) ??
    /iPhone (13|14|15|16) Pro|Pro Max|Galaxy S(22|23|24|25)|Fold|Flip/i;
  const keyRegion =
    safe(cfg?.keyRegions) ??
    /Nghệ An|Hà Tĩnh|Quảng Bình|Thanh Hóa|Quảng Ninh|Hải Phòng/i;
  if (vipDevice.test(data.device_model_name)) score += 20;
  if (data.time_on_page_seconds >= vipTime) score += 15;
  if (data.scroll_depth_percent >= vipScroll) score += 12;
  if (keyRegion.test(data.form_city)) score += 8;
  if (data.utm_source && data.utm_source !== "Direct") score += 5;
  if (
    data.focus_section === "luong_thuc_tap" ||
    data.copied_text_type === "chi_phi"
  )
    score += 5;
  score = Math.max(0, Math.min(100, score));
  return {
    score,
    rank:
      score >= 80
        ? "VIP"
        : score >= 65
          ? "Tiềm năng cao"
          : score >= 50
            ? "Tiềm năng"
            : "Cần nuôi dưỡng",
  };
}
function generateSaleAdvice(data) {
  const advice = [];
  const isHighEndDevice =
    /iPhone (13|14|15|16) Pro|Pro Max|Galaxy S(22|23|24|25)|Fold|Flip/i.test(
      data.device_model_name,
    );
  const h = /* @__PURE__ */ new Date().getHours();
  const isNightTime = h >= 22 || h <= 6;
  const isLocationMismatch = Boolean(
    data.location_city &&
    data.form_city &&
    !data.location_city.toLowerCase().includes(data.form_city.toLowerCase()) &&
    !data.form_city.toLowerCase().includes(data.location_city.toLowerCase()),
  );
  const isKeyRegion =
    /Nghệ An|Hà Tĩnh|Quảng Bình|Thanh Hóa|Quảng Ninh|Hải Phòng/i.test(
      data.form_city,
    );
  if (data.form_fill_duration_seconds < 4 || data.is_headless_browser)
    return "🚨 [LEAD ẢO / BOT SPAM] Điền Form quá nhanh (<4s) hoặc dùng trình duyệt giả lập. KHÔNG GỌI, kiểm tra Zalo trước!";
  if (data.submission_count_same_ip > 1)
    return `🚨 [CẢNH BÁO SPAM IP] IP này đã bấm gửi ${data.submission_count_same_ip} lần trong ngày. Nghi vấn đối thủ phá Ads hoặc trùng thông tin!`;
  if (isLocationMismatch && data.is_copy_paste)
    return `⚠️ [NGHI VẤN ĐỐI THỦ DÒ GIÁ] Khai ở ${data.form_city} nhưng IP tại ${data.location_city} + Copy/Paste SĐT. Xác minh kỹ, tuyệt đối không gửi báo giá chi tiết sớm!`;
  if (
    isHighEndDevice &&
    data.time_on_page_seconds >= 80 &&
    data.scroll_depth_percent >= 70
  ) {
    advice.push(
      `💡 [KHÁCH VIP - PHỤ HUYNH TÀI CHÍNH TỐT] Dùng ${data.device_model_name}. Nghiên cứu rất kỹ trang (${data.time_on_page_seconds}s, cuộn ${data.scroll_depth_percent}%).`,
    );
    advice.push(
      `👉 KỊCH BẢN GỌI: "Em chào anh/chị, em thấy mình đang tìm hiểu lộ trình Du học nghề trọn gói cho cháu. Bên em có chương trình cam kết Visa 100% & KTX VIP tiêu chuẩn..."`,
    );
  } else if (
    data.focus_section === "luong_thuc_tap" ||
    data.copied_text_type === "chi_phi"
  ) {
    advice.push(
      `💡 [KHÁCH QUAN TÂM THU NHẬP / TÀI CHÍNH] Ngâm đọc rất kỹ phần Chi phí & Thực tập.`,
    );
    advice.push(
      `👉 KỊCH BẢN GỌI: "Chào bạn, ngành ${data.nganh_hoc} đang có gói Vừa học vừa làm thực tập hưởng lương 15-25 triệu/tháng giúp tự trang trải 100% học phí..."`,
    );
  } else if (data.faq_clicked === "tieng_trung") {
    advice.push(
      `💡 [KHÁCH LO RÀO CẢN TIẾNG TRUNG] Thắc mắc điều kiện đầu vào.`,
    );
    advice.push(
      `👉 KỊCH BẢN GỌI: "Bạn yên tâm nếu chưa biết tiếng Trung nhé, bên mình đào tạo siêu tốc từ 0 lên HSK4 tại Việt Nam trước khi xuất cảnh..."`,
    );
  } else if (data.industry_switch_count > 1) {
    advice.push(
      `💡 [KHÁCH PHÂN VÂN NGÀNH HỌC] Đã đổi chọn ngành ${data.industry_switch_count} lần trước khi chốt ngành ${data.nganh_hoc}.`,
    );
    advice.push(
      `👉 KỊCH BẢN GỌI: Đóng vai Hướng nghiệp, phân tích tiềm năng việc làm & mức lương ngành ${data.nganh_hoc} so với các ngành khác.`,
    );
  } else if (data.time_on_page_seconds < 25) {
    advice.push(
      `💡 [KHÁCH XEM LƯỚT VỘI] Dùng ${data.device_model_name}, lướt nhanh ${data.time_on_page_seconds}s.`,
    );
    advice.push(
      `👉 HÀNH ĐỘNG: Kết bạn Zalo gửi trước Video thực tế KTX & Trường học Trung Quốc rồi mới gọi điện tư vấn.`,
    );
  } else {
    advice.push(
      `💡 [KHÁCH TÌM HIỂU CHUẨN] Dùng ${data.device_model_name} tại ${data.location_city || "không rõ"}.`,
    );
    advice.push(
      `👉 KỊCH BẢN GỌI: Khai thác nguyện vọng học ngành ${data.nganh_hoc} và trình độ tiếng Trung hiện tại.`,
    );
  }
  if (data.current_battery_level != null && data.current_battery_level <= 15)
    advice.push(
      `⚡ (Pin thiết bị sắp hết: ${data.current_battery_level}%. Ưu tiên nhắn Zalo/gọi gấp trước khi máy sập nguồn).`,
    );
  if (data.time_to_first_interaction_seconds > 120)
    advice.push(
      `🧐 (Khách ngẫm hơn 2 phút mới bắt đầu gõ Form: Cân nhắc rất kỹ, Sale nên tư vấn chuyên sâu).`,
    );
  if (isKeyRegion)
    advice.push(
      `📌 (Khách ở ${data.form_city} - Tỉnh trọng điểm: Nhắc đến cộng đồng du học sinh đồng hương đông đảo tại trường).`,
    );
  if (isNightTime)
    advice.push(
      `🌙 (Đăng ký đêm muộn: Nhắn Zalo chào trước, 8h30 sáng hôm sau mới gọi điện).`,
    );
  return advice.join("\n");
}
function generateBehaviorSummary(data) {
  const summary = [];
  summary.push(
    `⏱️ Xem web: ${data.time_on_page_seconds}s (Ngẫm ${data.time_to_first_interaction_seconds || 0}s mới điền, Điền mất ${data.form_fill_duration_seconds}s)`,
  );
  summary.push(`📜 Cuộn: ${data.scroll_depth_percent}%`);
  if (data.industry_switch_count > 0)
    summary.push(`🔄 Đổi ngành: ${data.industry_switch_count} lần`);
  if (data.focus_section) summary.push(`🎯 Tập trung: ${data.focus_section}`);
  if (data.faq_clicked) summary.push(`❓ FAQ xem: ${data.faq_clicked}`);
  if (data.is_copy_paste) summary.push(`📋 Thao tác: Copy-Paste SĐT`);
  return summary.join(" | ");
}
function generateDeviceTechInfo(data) {
  const batteryInfo =
    data.start_battery_level != null
      ? `🔋 Pin: ${data.current_battery_level}% (Giảm ${data.battery_drain}% khi lướt)`
      : "🔋 Pin: N/A";
  return `${data.device_model_name} | ${data.operating_system} | ${batteryInfo} | Mạng: ${data.connection_type || "WiFi/4G"} | IP: ${data.client_ip || "N/A"} (${data.location_city || "Không rõ"}) | Browser: ${data.browser}`;
}
function generateTrafficAdsSource(data) {
  return `Source: ${data.utm_source || "Direct"} | Medium: ${data.utm_medium || "N/A"} | Campaign: ${data.utm_campaign || "N/A"} | Content: ${data.utm_content || "N/A"} | TTCLID: ${data.ttclid || "N/A"}`;
}
var MAJORS = [
  "Công nghệ Ô tô điện",
  "Công nghệ Drone (UAV)",
  "Thương mại điện tử",
  "Logistics & Chuỗi cung ứng",
  "Kỹ thuật Điện tử",
  "IoT - Internet vạn vật",
  "Cơ khí tự động hóa",
  "Hán ngữ thương mại",
];
/** 63 tỉnh/thành Việt Nam gom theo vùng (dùng cho <optgroup>) */
var PROVINCE_GROUPS = [
  {
    region: "Miền Bắc",
    provinces: [
      "Hà Nội",
      "Hà Giang",
      "Cao Bằng",
      "Bắc Kạn",
      "Tuyên Quang",
      "Lào Cai",
      "Điện Biên",
      "Lai Châu",
      "Sơn La",
      "Yên Bái",
      "Hòa Bình",
      "Thái Nguyên",
      "Lạng Sơn",
      "Quảng Ninh",
      "Bắc Giang",
      "Phú Thọ",
      "Vĩnh Phúc",
      "Bắc Ninh",
      "Hải Dương",
      "Hải Phòng",
      "Hưng Yên",
      "Thái Bình",
      "Hà Nam",
      "Nam Định",
      "Ninh Bình",
    ],
  },
  {
    region: "Miền Trung & Tây Nguyên",
    provinces: [
      "Thanh Hóa",
      "Nghệ An",
      "Hà Tĩnh",
      "Quảng Bình",
      "Quảng Trị",
      "Thừa Thiên Huế",
      "Đà Nẵng",
      "Quảng Nam",
      "Quảng Ngãi",
      "Bình Định",
      "Phú Yên",
      "Khánh Hòa",
      "Ninh Thuận",
      "Bình Thuận",
      "Kon Tum",
      "Gia Lai",
      "Đắk Lắk",
      "Đắk Nông",
      "Lâm Đồng",
    ],
  },
  {
    region: "Miền Nam",
    provinces: [
      "Bình Phước",
      "Tây Ninh",
      "Bình Dương",
      "Đồng Nai",
      "Bà Rịa - Vũng Tàu",
      "TP. Hồ Chí Minh",
      "Long An",
      "Tiền Giang",
      "Bến Tre",
      "Trà Vinh",
      "Vĩnh Long",
      "Đồng Tháp",
      "An Giang",
      "Kiên Giang",
      "Cần Thơ",
      "Hậu Giang",
      "Sóc Trăng",
      "Bạc Liêu",
      "Cà Mau",
    ],
  },
];
var EMPTY = {
  name: "",
  phone: "",
  email: "",
  province: "",
  major: "",
};
var inputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30";
/** Rate limiting: giới hạn số lần gửi trong 1 cửa sổ thời gian / trình duyệt (cấu hình trong Admin). */
var RATE_KEY = "lp_rate";
function rateLimited(maxCount, windowMin) {
  if (typeof window === "undefined") return false;
  const now = Date.now();
  const windowMs = Math.max(1, windowMin) * 60 * 1e3;
  let stamps = [];
  try {
    stamps = JSON.parse(localStorage.getItem(RATE_KEY) || "[]");
  } catch {
    stamps = [];
  }
  stamps = stamps.filter((t) => now - t < windowMs);
  if (stamps.length >= Math.max(1, maxCount)) return true;
  stamps.push(now);
  try {
    localStorage.setItem(RATE_KEY, JSON.stringify(stamps));
  } catch {}
  return false;
}
function LeadForm({ id = "dang-ky" }) {
  const { config } = useSiteConfig();
  const [status, setStatus] = (0, import_react.useState)("idle");
  const [error, setError] = (0, import_react.useState)("");
  const [form, setForm] = (0, import_react.useState)(EMPTY);
  const startedRef = (0, import_react.useRef)(false);
  const honeypotRef = (0, import_react.useRef)(null);
  const set = (k) => (e) =>
    setForm((f) => ({
      ...f,
      [k]: e.target.value,
    }));
  const setMajor = (e) => {
    markIndustrySwitch();
    setForm((f) => ({
      ...f,
      major: e.target.value,
    }));
  };
  const setPhone = (e) =>
    setForm((f) => ({
      ...f,
      phone: e.target.value.replace(/\D/g, "").slice(0, 10),
    }));
  const onFirstInteract = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    markFormStart();
    trackFormStart();
  };
  async function onSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;
    if (honeypotRef.current?.value) {
      setForm(EMPTY);
      setStatus("done");
      return;
    }
    const phone = form.phone.replace(/\D/g, "");
    if (!/^0\d{9}$/.test(phone)) {
      setError(
        "Số điện thoại phải đủ 10 chữ số và bắt đầu bằng 0 — ví dụ: 0912345678.",
      );
      setStatus("error");
      return;
    }
    const email = form.email.trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError("Email chưa đúng định dạng — ví dụ: ten@gmail.com.");
      setStatus("error");
      return;
    }
    if (isDuplicateLead(phone)) {
      setError(
        "Số điện thoại này vừa được đăng ký. Tư vấn viên sẽ liên hệ với bạn sớm nhất.",
      );
      setStatus("error");
      return;
    }
    if (
      rateLimited(config.form.rateLimitCount, config.form.rateLimitWindowMin)
    ) {
      setError(
        "Bạn đã gửi nhiều lần trong thời gian ngắn. Vui lòng chờ vài phút rồi thử lại.",
      );
      setStatus("error");
      return;
    }
    setError("");
    setStatus("sending");
    const behavior = collectBehavior({
      city: form.province,
      major: form.major,
    });
    const { score: aiScore, rank: aiRank } = scoreLead(
      behavior,
      config.aiAdvisor,
    );
    const variant = getVariant(config.abTest.enabled, config.abTest.split);
    const source = utmSource();
    const payload = {
      full_name: form.name.trim().slice(0, 100),
      phone,
      email: email.slice(0, 255),
      major: form.major,
      city: form.province,
      source:
        typeof window !== "undefined"
          ? window.location.href
          : "Landing Page UTM",
      created_at: /* @__PURE__ */ new Date().toISOString(),
      ab_variant: variant,
      ai_score: aiScore,
      ai_rank: aiRank,
      sale_advice: generateSaleAdvice(behavior),
      behavior_summary: generateBehaviorSummary(behavior),
      device_tech_info: generateDeviceTechInfo(behavior),
      traffic_ads_source: generateTrafficAdsSource(behavior),
    };
    try {
      const leadRecord = {
        id: `ld_${Date.now()}`,
        at: payload.created_at,
        name: payload.full_name,
        phone: payload.phone,
        aiScore,
        aiRank,
        utmSource: source,
        variant,
      };
      if (payload.email) leadRecord.email = payload.email;
      if (payload.city) leadRecord.city = payload.city;
      if (payload.major) leadRecord.major = payload.major;
      await saveLead(leadRecord, config);
      dispatchLead(config, payload).then(({ ok, results }) => {
        if (!ok && results.length > 0) {
          console.warn("All webhook endpoints failed:", results);
          toast.warning("Lead đã lưu vào CRM nhưng webhook chưa nhận được", {
            description:
              "Kiểm tra cấu hình endpoint trong Admin > Cổng Webhook & Đa Kênh.",
          });
        } else if (results.some((result) => !result.ok))
          console.warn("Some webhook endpoints failed:", results);
      });
      trackConversion(source, config.abTest.enabled ? variant : void 0);
      if (config.emailAutomation.enabled && email) {
        const fill = (s) =>
          s
            .replaceAll("{name}", payload.full_name)
            .replaceAll("{phone}", payload.phone)
            .replaceAll("{city}", payload.city || "")
            .replaceAll("{ai_score}", String(aiScore));
        sendLeadEmail({
          data: {
            provider: config.emailAutomation.provider,
            to: email,
            from: config.emailAutomation.fromEmail,
            subject: fill(config.emailAutomation.subject),
            text: fill(config.emailAutomation.body),
          },
        })
          .then((result) => {
            if (!result.sent)
              console.warn(
                "Lead confirmation email was not sent:",
                result.reason,
              );
          })
          .catch((error) => {
            console.warn("Lead confirmation email failed:", error);
          });
      }
      trackLead({ content_name: form.major || "Du hoc nghe Trung Quoc" });
      setForm(EMPTY);
      setStatus("done");
      toast.success("Đăng ký thành công!", {
        description: "Tư vấn viên sẽ liên hệ lại trong 5 phút.",
      });
      const redirect = config.form.redirectUrl?.trim();
      if (redirect && typeof window !== "undefined")
        window.location.assign(redirect);
      else {
        const thankYou = config.pages.find(
          (page) => page.enabled && page.kind === "thankYou",
        );
        if (thankYou && typeof window !== "undefined")
          window.location.assign(`/${thankYou.path}`);
      }
    } catch {
      setError(
        "Có lỗi khi gửi thông tin. Vui lòng kiểm tra kết nối và thử gửi lại.",
      );
      setStatus("error");
      toast.error("Gửi chưa thành công", {
        description: "Vui lòng thử lại sau vài giây.",
      });
    }
  }
  if (status === "done")
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      id,
      className:
        "rounded-2xl bg-card p-8 text-center shadow-[var(--shadow-card)] ring-1 ring-border",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
          className:
            "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold text-2xl font-bold text-gold-foreground",
          children: "✓",
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
          className: "mt-4 text-2xl font-extrabold",
          children: "Đăng ký thành công!",
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
          className: "mt-2 text-muted-foreground",
          children:
            "Tư vấn viên sẽ liên hệ lại với bạn trong 5 phút. Vui lòng để ý điện thoại (cuộc gọi hoặc Zalo).",
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
          type: "button",
          onClick: () => setStatus("idle"),
          className:
            "mt-5 text-sm font-bold text-primary underline underline-offset-4",
          children: "Gửi thêm một đăng ký khác",
        }),
      ],
    });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
    id,
    onSubmit,
    className:
      "rounded-2xl bg-card p-6 shadow-[var(--shadow-card)] ring-1 ring-border sm:p-8",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
        className: "text-xs font-bold uppercase tracking-widest text-primary",
        children: "Miễn phí 100%",
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
        className: "mt-1 text-2xl font-extrabold leading-tight sm:text-3xl",
        children: "Nhận lộ trình du học nghề 0Đ",
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
        className: "mt-2 text-sm text-muted-foreground",
        children:
          "Chỉ 30 giây. Chúng tôi gọi lại tư vấn 1:1, không thu bất kỳ khoản phí nào.",
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "mt-5 space-y-3",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
            ref: honeypotRef,
            type: "text",
            name: "company",
            tabIndex: -1,
            autoComplete: "off",
            "aria-hidden": "true",
            className: "absolute left-[-9999px] h-0 w-0 opacity-0",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
            required: true,
            maxLength: 100,
            value: form.name,
            onChange: set("name"),
            onFocus: onFirstInteract,
            placeholder: "Họ và tên",
            className: inputClass,
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
            required: true,
            type: "tel",
            inputMode: "numeric",
            pattern: "[0-9]*",
            maxLength: 10,
            value: form.phone,
            onChange: setPhone,
            onFocus: onFirstInteract,
            onPaste: () => markCopyPaste("sdt"),
            placeholder: "Số điện thoại (Zalo) — 10 số",
            className: inputClass,
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
            type: "email",
            maxLength: 255,
            value: form.email,
            onChange: set("email"),
            onFocus: onFirstInteract,
            placeholder: "Email (không bắt buộc)",
            className: inputClass,
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
            required: true,
            value: form.province,
            onChange: set("province"),
            className: inputClass,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
                value: "",
                children: "Tỉnh/Thành phố",
              }),
              PROVINCE_GROUPS.map((g) =>
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "optgroup",
                  {
                    label: g.region,
                    children: g.provinces.map((p) =>
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        "option",
                        {
                          value: p,
                          children: p,
                        },
                        p,
                      ),
                    ),
                  },
                  g.region,
                ),
              ),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
            required: true,
            value: form.major,
            onChange: setMajor,
            className: inputClass,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
                value: "",
                children: "Ngành quan tâm",
              }),
              MAJORS.map((m) =>
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "option",
                  {
                    value: m,
                    children: m,
                  },
                  m,
                ),
              ),
            ],
          }),
        ],
      }),
      status === "error" &&
        error &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
          className: "mt-3 text-sm font-medium text-destructive",
          role: "alert",
          children: error,
        }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
        type: "submit",
        disabled: status === "sending",
        "aria-busy": status === "sending",
        className:
          "mt-5 flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-4 text-base font-extrabold uppercase tracking-wide text-primary-foreground shadow-[var(--shadow-cta)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:text-lg",
        children: [
          status === "sending" &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
              "aria-hidden": "true",
              className:
                "h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground",
            }),
          status === "sending"
            ? "Đang gửi..."
            : "Gửi đăng ký — Nhận lộ trình 0Đ",
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
        className: "mt-3 text-center text-xs text-muted-foreground",
        children:
          "Thông tin của bạn được bảo mật, chỉ dùng để tư vấn hướng nghiệp.",
      }),
    ],
  });
}
/** Fade + rise vào khi phần tử lọt vào khung nhìn. */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = (0, import_react.useRef)(null);
  const [shown, setShown] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.05,
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    ref,
    style: { transitionDelay: `${delay}ms` },
    className: `transition-all duration-700 ease-out ${shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${className}`,
    children,
  });
}
function pick(arr, previous) {
  if (!arr.length) return void 0;
  if (arr.length === 1 || previous === void 0)
    return arr[Math.floor(Math.random() * arr.length)];
  const candidates = arr.filter((item) => item !== previous);
  return candidates[Math.floor(Math.random() * candidates.length)];
}
/** Thông báo "khách vừa đăng ký" trượt lên góc màn hình — dữ liệu & vị trí lấy từ Admin. */
function RecentLeadPopup() {
  const { config } = useSiteConfig();
  const fomo = config.fomo;
  const [item, setItem] = (0, import_react.useState)(null);
  const [visible, setVisible] = (0, import_react.useState)(false);
  const [dismissed, setDismissed] = (0, import_react.useState)(false);
  const previousNameRef = (0, import_react.useRef)(void 0);
  const leadsRef = (0, import_react.useRef)([]);
  const fomoRef = (0, import_react.useRef)(fomo);
  const immediateHideRef = (0, import_react.useRef)(void 0);
  const hideRef = (0, import_react.useRef)(void 0);
  fomoRef.current = fomo;
  const sampleItems = (0, import_react.useMemo)(
    () =>
      fomo.names.map((name, index) => ({
        name,
        city: fomo.cities[index % Math.max(1, fomo.cities.length)] || "",
        mins: 1 + (index % 9),
      })),
    [fomo.names, fomo.cities],
  );
  (0, import_react.useEffect)(() => {
    const refreshLeads = () => {
      const recent = loadLeads().filter((lead) => {
        const timestamp = new Date(lead.at).getTime();
        return Number.isFinite(timestamp) && Date.now() - timestamp < 864e5;
      });
      leadsRef.current = recent;
    };
    const showNewLead = (event) => {
      const lead = event.detail;
      const currentFomo = fomoRef.current;
      if (!currentFomo.enabled || !lead?.name) return;
      if (
        currentFomo.respectReducedMotion &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      const timestamp = new Date(lead.at).getTime();
      const mins = Number.isFinite(timestamp)
        ? Math.max(1, Math.floor((Date.now() - timestamp) / 6e4))
        : 1;
      window.clearTimeout(immediateHideRef.current);
      window.clearTimeout(hideRef.current);
      setItem({
        name: lead.name,
        city: lead.city || "",
        mins,
      });
      setDismissed(false);
      setVisible(true);
      immediateHideRef.current = window.setTimeout(
        () => setVisible(false),
        Math.min(30, Math.max(2, currentFomo.displaySec)) * 1e3,
      );
    };
    refreshLeads();
    window.addEventListener(LEAD_CREATED_EVENT, refreshLeads);
    window.addEventListener(LEAD_CREATED_EVENT, showNewLead);
    return () => {
      window.removeEventListener(LEAD_CREATED_EVENT, refreshLeads);
      window.removeEventListener(LEAD_CREATED_EVENT, showNewLead);
      window.clearTimeout(immediateHideRef.current);
    };
  }, []);
  (0, import_react.useEffect)(() => {
    setDismissed(false);
    setVisible(false);
    if (
      !fomo.enabled ||
      (fomo.source === "sample" && sampleItems.length === 0) ||
      (fomo.source === "recentLeads" &&
        leadsRef.current.length === 0 &&
        sampleItems.length === 0)
    )
      return;
    if (
      fomo.respectReducedMotion &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let hideTimer;
    let nextTimer;
    let lastName = previousNameRef.current;
    const displayMs = Math.min(30, Math.max(2, fomo.displaySec)) * 1e3;
    const minGap = Math.min(3600, Math.max(5, fomo.minDelaySec)) * 1e3;
    const maxGap =
      Math.min(3600, Math.max(minGap / 1e3, fomo.maxDelaySec)) * 1e3;
    const show = () => {
      const actual =
        fomo.source === "recentLeads"
          ? pick(
              leadsRef.current,
              leadsRef.current.find((lead) => lead.name === lastName),
            )
          : void 0;
      const sample =
        fomo.source === "sample" || leadsRef.current.length === 0
          ? pick(
              sampleItems,
              sampleItems.find((entry) => entry.name === lastName),
            )
          : void 0;
      const next = actual
        ? {
            name: actual.name,
            city: actual.city || "",
            mins: Math.max(
              1,
              Math.floor((Date.now() - new Date(actual.at).getTime()) / 6e4),
            ),
          }
        : sample;
      if (!next) return;
      lastName = next.name;
      previousNameRef.current = lastName;
      setItem(next);
      setVisible(true);
      hideTimer = window.setTimeout(() => setVisible(false), displayMs);
      hideRef.current = hideTimer;
      const gap = minGap + Math.random() * (maxGap - minGap);
      nextTimer = window.setTimeout(show, displayMs + gap);
    };
    const first = window.setTimeout(show, minGap);
    return () => {
      window.clearTimeout(first);
      if (hideTimer) window.clearTimeout(hideTimer);
      if (nextTimer) window.clearTimeout(nextTimer);
      window.clearTimeout(hideRef.current);
    };
  }, [
    fomo.enabled,
    fomo.source,
    fomo.respectReducedMotion,
    fomo.displaySec,
    fomo.minDelaySec,
    fomo.maxDelaySec,
    sampleItems,
  ]);
  if (!fomo.enabled || !item || dismissed) return null;
  const message = fomo.template
    .replaceAll("{name}", item.name)
    .replaceAll("{city}", item.city)
    .replaceAll("{mins}", String(item.mins));
  const side =
    fomo.position === "right"
      ? "right-3 sm:right-6 left-auto"
      : "left-3 sm:left-6 right-auto";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    role: "status",
    "aria-live": "polite",
    className: `pointer-events-none fixed bottom-24 z-40 max-w-[17rem] rounded-2xl bg-card/90 p-3 shadow-[var(--shadow-card)] ring-1 ring-border backdrop-blur transition-all duration-500 sm:bottom-6 ${side} ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: "pointer-events-auto flex items-start gap-2",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "min-w-0 flex-1",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
              className: "text-xs leading-snug text-card-foreground",
              children: message,
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
              className: "mt-1 text-[11px] font-semibold text-primary",
              children: [item.mins, " phút trước"],
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
          type: "button",
          onClick: () => {
            setDismissed(true);
            setVisible(false);
          },
          "aria-label": "Đóng thông báo",
          className:
            "shrink-0 text-xs text-muted-foreground hover:text-foreground",
          children: "×",
        }),
      ],
    }),
  });
}
/** Carousel ảnh thực tế, tự chạy mượt, có nút chuyển và chấm điều hướng. */
function PhotoCarousel({ slides, interval = 4e3 }) {
  const [i, setI] = (0, import_react.useState)(0);
  const paused = (0, import_react.useRef)(false);
  (0, import_react.useEffect)(() => {
    const id = window.setInterval(() => {
      if (!paused.current) setI((p) => (p + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [slides.length, interval]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: "overflow-hidden rounded-2xl bg-card ring-1 ring-border",
    onMouseEnter: () => (paused.current = true),
    onMouseLeave: () => (paused.current = false),
    onTouchStart: () => (paused.current = true),
    onTouchEnd: () => (paused.current = false),
    "aria-roledescription": "carousel",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "relative",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
            className: "flex transition-transform duration-700 ease-out",
            style: { transform: `translateX(-${i * 100}%)` },
            children: slides.map((s, idx) =>
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "figure",
                {
                  className: "w-full shrink-0",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
                      src: s.img,
                      alt: s.caption,
                      width: 1280,
                      height: 800,
                      loading: "lazy",
                      decoding: "async",
                      className: "aspect-[16/10] w-full object-cover",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
                      className:
                        "px-4 py-3 text-center text-sm font-semibold text-card-foreground/85",
                      children: [idx + 1, "/", slides.length, " — ", s.caption],
                    }),
                  ],
                },
                s.img,
              ),
            ),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
            type: "button",
            "aria-label": "Ảnh trước",
            onClick: () => setI((p) => (p - 1 + slides.length) % slides.length),
            className:
              "absolute left-2 top-1/3 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-lg font-bold backdrop-blur",
            children: "‹",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
            type: "button",
            "aria-label": "Ảnh tiếp theo",
            onClick: () => setI((p) => (p + 1) % slides.length),
            className:
              "absolute right-2 top-1/3 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-lg font-bold backdrop-blur",
            children: "›",
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: "flex justify-center gap-2 pb-4",
        children: slides.map((s, idx) =>
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              type: "button",
              "aria-label": `Xem ảnh ${idx + 1}`,
              onClick: () => setI(idx),
              className: `h-2 rounded-full transition-all ${idx === i ? "w-6 bg-primary" : "w-2 bg-border"}`,
            },
            s.img,
          ),
        ),
      }),
    ],
  });
}
/** Chuẩn hoá số điện thoại & link Zalo từ cấu hình Admin. */
function contactLinks(config) {
  const c = config.floatingContact;
  const phone = (c.hotline || "").replace(/[^\d+]/g, "");
  const zaloRaw = (c.zalo || "").trim();
  const zaloDigits = zaloRaw.replace(/\D/g, "");
  let zaloHref = "";
  if (/^https?:\/\//i.test(zaloRaw)) zaloHref = zaloRaw;
  else if (zaloDigits) zaloHref = `https://zalo.me/${zaloDigits}`;
  else if (phone) zaloHref = `https://zalo.me/${phone.replace(/\D/g, "")}`;
  return {
    enabled: c.enabled,
    phone,
    hotlineHref: phone ? `tel:${phone}` : "#dang-ky",
    hasHotline: Boolean(phone),
    zaloHref: zaloHref || "#dang-ky",
    hasZalo: Boolean(zaloHref),
    messengerHref: (c.messenger || "").trim(),
  };
}
/**
 * Thanh CTA cố định ở mép dưới, chỉ hiện trên mobile sau khi cuộn qua hero.
 * Số điện thoại / Zalo đọc trực tiếp từ cấu hình Admin.
 */
function StickyMobileCTA() {
  const { config } = useSiteConfig();
  const links = contactLinks(config);
  const [show, setShow] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  function toForm(e) {
    e.preventDefault();
    (
      document.getElementById("dang-ky-cuoi") ??
      document.getElementById("dang-ky")
    )?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    className: `fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-3 py-2.5 backdrop-blur transition-transform duration-300 sm:hidden ${show ? "translate-y-0" : "translate-y-full"}`,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: "flex items-center gap-2.5",
      children: [
        links.enabled &&
          links.hasZalo &&
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
            href: links.zaloHref,
            target: "_blank",
            rel: "noopener noreferrer",
            className:
              "flex-1 rounded-xl bg-gold py-3.5 text-center text-sm font-extrabold text-gold-foreground shadow-[var(--shadow-card)]",
            children: "Zalo Tư Vấn",
          }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
          href: "#dang-ky-cuoi",
          onClick: toForm,
          className:
            "flex-[1.3] rounded-xl bg-primary py-3.5 text-center text-sm font-extrabold uppercase text-primary-foreground shadow-[var(--shadow-cta)]",
          children: "Đăng Ký Ngay",
        }),
      ],
    }),
  });
}
/** Cụm nút liên hệ nổi (Hotline / Zalo / Messenger) — đọc từ cấu hình Admin. */
function FloatingContact() {
  const { config } = useSiteConfig();
  const links = contactLinks(config);
  if (!links.enabled) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className:
      "fixed bottom-20 right-4 z-50 flex flex-col gap-3 sm:bottom-6 sm:right-6",
    children: [
      links.messengerHref &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
          href: links.messengerHref,
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": "Nhắn tin Messenger",
          className:
            "flex h-12 w-12 items-center justify-center rounded-full bg-card text-foreground shadow-[var(--shadow-card)] ring-1 ring-border transition hover:scale-105",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
            className: "h-5 w-5",
          }),
        }),
      links.hasZalo &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
          href: links.zaloHref,
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": "Chat Zalo tư vấn",
          className:
            "flex h-12 w-12 items-center justify-center rounded-full bg-gold text-xs font-black text-gold-foreground shadow-[var(--shadow-card)] transition hover:scale-105",
          children: "Zalo",
        }),
      links.hasHotline &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
          href: links.hotlineHref,
          "aria-label": "Gọi hotline tư vấn",
          className:
            "flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-cta)] transition hover:scale-105",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
            className: "h-6 w-6",
          }),
        }),
    ],
  });
}
/**
 * Widget thống kê traffic realtime ở chân trang.
 * Số người online là chỉ số tương đối (12–38) dao động nhẹ theo thời gian;
 * lượt truy cập ngày/tháng lưu ở localStorage của chính thiết bị.
 */
function FooterStats() {
  const [online, setOnline] = (0, import_react.useState)(24);
  const [visits, setVisits] = (0, import_react.useState)({
    today: 0,
    month: 0,
  });
  const [device, setDevice] = (0, import_react.useState)("");
  const [ip, setIp] = (0, import_react.useState)({
    ip: "",
    city: "",
    visitsToday: 0,
  });
  (0, import_react.useEffect)(() => {
    setVisits(bumpVisitCounters());
    const dev = detectDevice();
    setDevice(`${dev.model} · ${dev.os}`);
    setOnline(12 + Math.floor(Math.random() * 27));
    const drift = window.setInterval(() => {
      setOnline((v) => {
        const next =
          v +
          (Math.random() < 0.5 ? -1 : 1) * (1 + Math.floor(Math.random() * 2));
        return Math.min(38, Math.max(12, next));
      });
    }, 4e3);
    const poll = window.setInterval(() => setIp(getIpSnapshot()), 1500);
    return () => {
      window.clearInterval(drift);
      window.clearInterval(poll);
    };
  }, []);
  const suspicious = ip.visitsToday > 5;
  const items = [
    {
      icon: "🔴",
      label: "Đang online",
      value: `${online} người`,
    },
    {
      icon: "📅",
      label: "Truy cập hôm nay",
      value: visits.today.toLocaleString("vi-VN"),
    },
    {
      icon: "📆",
      label: "Truy cập tháng này",
      value: visits.month.toLocaleString("vi-VN"),
    },
    {
      icon: "⚡",
      label: "Thiết bị của bạn",
      value: device
        ? `${device}${ip.ip ? ` · IP ${ip.ip}` : ""}`
        : "Đang nhận diện...",
    },
  ];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
    "aria-label": "Thống kê lưu lượng truy cập",
    className: "rounded-2xl bg-card/80 p-4 ring-1 ring-border backdrop-blur",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
        className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
        children: items.map((it) =>
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "div",
            {
              className:
                "rounded-xl bg-background/70 px-3.5 py-3 ring-1 ring-border/70",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
                  className:
                    "flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      "aria-hidden": "true",
                      children: it.icon,
                    }),
                    it.label,
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
                  className: "mt-1 truncate text-sm font-bold text-foreground",
                  title: it.value,
                  children: it.value,
                }),
              ],
            },
            it.label,
          ),
        ),
      }),
      suspicious &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
          role: "status",
          className:
            "mt-3 rounded-xl bg-destructive/10 px-3.5 py-2.5 text-sm font-bold text-destructive ring-1 ring-destructive/30",
          children: "🛡️ Cảnh báo: Phát hiện lưu lượng cao từ IP này!",
        }),
    ],
  });
}
var gallery_visa_default = "/assets/gallery-visa-C2KfDTnt.webp";
var gallery_campus_default = "/assets/gallery-campus-Ccbnr8PW.webp";
var gallery_dorm_room_default = "/assets/gallery-dorm-room-CN0jv29K.webp";
var gallery_airport_default = "/assets/gallery-airport-BNYTV757.webp";
var Toaster$1 = ({ ...props }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
    className: "toaster group",
    toastOptions: {
      classNames: {
        toast:
          "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
        description: "group-[.toast]:text-muted-foreground",
        actionButton:
          "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
        cancelButton:
          "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
      },
    },
    ...props,
  });
};
/**
 * Thông tin liên hệ dùng chung cho chân trang và các nút liên hệ nổi.
 * Để chuỗi rỗng ("") thì dòng tương ứng sẽ tự ẩn cho tới khi có thông tin thật.
 */
var FOOTER = {
  hotline: "",
  email: "",
  /** Số Zalo nhận tin nhắn tư vấn nhanh (để trống thì dùng hotline) */
  zalo: "",
  /** Đơn vị bảo trợ chuyên môn & tuyển sinh hiển thị ở chân trang */
  sponsor: "Trung tâm Hướng nghiệp & Phát triển Sự nghiệp Quốc tế",
  address: "",
  licenseNumber: "",
};
var MAJOR_FUTURES = [
  "Đón đầu xu hướng điện hóa giao thông, pin thế hệ mới và hệ sinh thái xe thông minh.",
  "Phát triển cùng nhu cầu UAV trong nông nghiệp, vận chuyển, khảo sát và cứu hộ.",
  "Mở rộng theo thương mại xuyên biên giới, bán hàng đa kênh và vận hành bằng dữ liệu.",
  "Giữ vai trò cốt lõi khi chuỗi cung ứng khu vực ngày càng tự động hóa và kết nối sâu.",
  "Là nền tảng cho thiết bị thông minh, năng lượng sạch, robot và sản xuất công nghệ cao.",
  "Kết nối nhà máy, đô thị và thiết bị thông minh trong nền kinh tế số tương lai.",
  "Thúc đẩy nhà máy thông minh, robot cộng tác và dây chuyền sản xuất ít phụ thuộc lao động tay chân.",
  "Tạo lợi thế trong thương mại, dịch vụ và hợp tác doanh nghiệp Việt Nam – Trung Quốc.",
];
var GALLERY = [
  {
    img: gallery_visa_default,
    caption: "Visa du học sinh đã được cấp cho học viên khóa gần nhất",
  },
  {
    img: gallery_campus_default,
    caption: "Khuôn viên trường Cao đẳng nghề đối tác tại Trung Quốc",
  },
  {
    img: gallery_dorm_room_default,
    caption: "Phòng ký túc xá trong trường — miễn 100% phí ở",
  },
  {
    img: gallery_airport_default,
    caption: "Học viên lên đường nhập học kỳ tháng 9",
  },
];
var EXPERTS = [
  {
    img: expert_1_default,
    name: "Ths. Nguyễn Thu Hương",
    role: "Chuyên gia định hướng ngành học",
    bio: "Tập trung đánh giá năng lực, sở thích và mục tiêu dài hạn để giúp học viên chọn ngành phù hợp.",
    experience:
      "Kinh nghiệm tư vấn lộ trình học nghề quốc tế và định hướng nghề nghiệp sau tốt nghiệp.",
  },
  {
    img: expert_2_default,
    name: "Ông Lê Quang Vinh",
    role: "Chuyên gia hồ sơ & tuyển sinh",
    bio: "Đồng hành cùng học viên từ bước rà soát điều kiện đến hoàn thiện hồ sơ nhập học và visa.",
    experience:
      "Kinh nghiệm xử lý hồ sơ tuyển sinh, thủ tục du học và chuẩn bị trước khi xuất cảnh.",
  },
  {
    img: expert_3_default,
    name: "Cô Phạm Minh Anh",
    role: "Chuyên gia đồng hành học viên",
    bio: "Hỗ trợ học viên chuẩn bị ngôn ngữ, kỹ năng thích nghi và kế hoạch học tập tại Trung Quốc.",
    experience:
      "Kinh nghiệm đào tạo kỹ năng tiền du học và hỗ trợ học viên trong quá trình hòa nhập.",
  },
];
function Landing() {
  const { config } = useSiteConfig();
  const content = config.landing;
  const variant = getVariant(config.abTest.enabled, config.abTest.split);
  const experimentHeadline =
    variant === "B"
      ? config.abTest.variantBHeadline
      : config.abTest.variantAHeadline;
  const experimentCta =
    variant === "B" ? config.abTest.variantBCta : config.abTest.variantACta;
  const section = (id) => content.sectionsArray.find((item) => item.id === id);
  const sectionStyle = (id) => ({
    order: content.sectionsArray.findIndex((item) => item.id === id) + 1,
    display: section(id)?.enabled === false ? "none" : void 0,
  });
  const gallerySlides = GALLERY.map((slide, index) => ({
    ...slide,
    img: content.galleryImageUrls[index] || slide.img,
    caption: content.galleryCaptions[index] || slide.caption,
  }));
  const faqs = content.faqs.map((faq) => ({
    slug: faq.slug,
    q: faq.question,
    a: faq.answer,
  }));
  const customSections = content.sectionsArray.filter(
    (item) => item.type === "custom" && item.enabled,
  );
  const links = contactLinks(config);
  const menuPages = config.pages
    .filter((page) => page.enabled && page.showInMenu)
    .sort((a, b) => a.menuOrder - b.menuOrder);
  const secondaryPageSectionIds = new Set(
    config.pages
      .filter((page) => page.id !== "home")
      .flatMap((page) => page.sectionIds || []),
  );
  const homeCustomSections = customSections.filter(
    (section) => !secondaryPageSectionIds.has(section.id),
  );
  (0, import_react.useEffect)(() => initBehavior(), []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    id: "top",
    className: "flex min-h-screen flex-col bg-background",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
        position: "top-center",
        richColors: true,
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
        style: { order: 0 },
        className:
          "sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className:
            "mx-auto flex max-w-6xl items-center justify-between px-4 py-3",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
              href: "#top",
              className: "flex min-w-0 max-w-[78%] items-center gap-2.5",
              "aria-label": content.brandName,
              children: [
                content.showLogo &&
                  (content.logoUrl
                    ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
                        src: content.logoUrl,
                        alt: "Logo",
                        className:
                          "h-9 w-9 shrink-0 rounded-lg object-contain ring-1 ring-primary/20 sm:h-11 sm:w-11 sm:rounded-xl",
                      })
                    : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                        className:
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[var(--shadow-cta)] sm:h-11 sm:w-11 sm:rounded-xl",
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          GraduationCap,
                          {
                            className: "h-5 w-5 sm:h-6 sm:w-6",
                            "aria-hidden": "true",
                          },
                        ),
                      })),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                  className:
                    "min-w-0 max-w-[15rem] truncate text-xs font-extrabold leading-tight sm:max-w-[22rem] sm:text-sm",
                  children: content.brandName,
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
              href: "#dang-ky",
              className:
                "hidden rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-cta)] transition hover:-translate-y-0.5 hover:brightness-110 sm:inline-block",
              children: content.heroCtaLabel,
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
              className: "hidden items-center gap-3 lg:flex",
              "aria-label": "Menu chính",
              children: menuPages.map((page) =>
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "a",
                  {
                    href: page.path ? `/${page.path}` : "#top",
                    className:
                      "text-xs font-semibold text-muted-foreground transition hover:text-foreground",
                    children: page.title,
                  },
                  page.id,
                ),
              ),
            }),
          ],
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
        style: sectionStyle("hero"),
        className: "surface-panel relative overflow-hidden",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
            src: content.heroImageUrl || "/assets/hero-student-RoGGUFG7.webp",
            alt: "Học viên Việt Nam thực hành lắp ráp ô tô điện tại trung tâm đào tạo nghề Trung Quốc",
            width: 1600,
            height: 1104,
            fetchPriority: "high",
            decoding: "async",
            className: "absolute inset-0 h-full w-full object-cover opacity-25",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className:
              "relative mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "text-surface-foreground",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                    className:
                      "inline-flex items-center gap-2 rounded-full bg-gold px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-gold-foreground",
                    children: content.heroEyebrow,
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
                    className:
                      "mt-6 text-3xl font-black leading-[1.12] sm:text-4xl lg:text-[3.25rem]",
                    children: [
                      experimentHeadline || content.heroTitle,
                      " ",
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                        className: "text-hero-gradient",
                        children: content.heroHighlight,
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                    className:
                      "mt-5 max-w-xl text-base leading-relaxed text-surface-foreground/85 sm:text-lg",
                    children: content.heroDescription,
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    className:
                      "mt-8 flex flex-col gap-3 sm:flex-row sm:items-center",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
                        href: "#dang-ky",
                        className:
                          "cta-pulse rounded-xl bg-primary px-7 py-4 text-center text-base font-extrabold uppercase tracking-wide text-primary-foreground sm:text-lg",
                        children: experimentCta || content.heroCtaLabel,
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                        className:
                          "text-center text-sm text-surface-foreground/70 sm:text-left",
                        children: [
                          "Chỉ còn ",
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            "strong",
                            {
                              className: "text-gold",
                              children: config.countdown.slotsLeft,
                            },
                          ),
                          " ",
                          config.countdown.headline,
                        ],
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
                    className:
                      "mt-9 grid gap-2.5 text-sm text-surface-foreground/80 sm:grid-cols-2",
                    children: content.heroTrustItems.map((item) =>
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                        "li",
                        { children: ["✓ ", item] },
                        item,
                      ),
                    ),
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "space-y-3 lg:pl-4",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScarcityBar, {
                    tone: "dark",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadForm, {}),
                ],
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
        style: sectionStyle("stats"),
        className: "border-b border-border bg-muted/50 py-10",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
          className:
            "mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 lg:grid-cols-4",
          children: content.stats.map((s, i) =>
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              Reveal,
              {
                delay: i * 80,
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "glass-card h-full rounded-2xl p-5 text-center",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                      className: "text-2xl font-black text-primary sm:text-3xl",
                      children: s.value,
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                      className:
                        "mt-2 text-xs font-semibold leading-snug text-muted-foreground sm:text-sm",
                      children: s.label,
                    }),
                  ],
                }),
              },
              s.label,
            ),
          ),
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
        style: sectionStyle("pains"),
        className: "mx-auto max-w-6xl px-4 py-16 sm:py-20",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
            className:
              "max-w-2xl text-2xl font-extrabold sm:text-3xl lg:text-4xl",
            children: content.painHeading,
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
            className: "mt-8 grid gap-5 sm:grid-cols-3",
            children: content.pains.map((p, i) =>
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                Reveal,
                {
                  delay: i * 100,
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    "div",
                    {
                      className:
                        "h-full rounded-2xl border border-border bg-card p-6 text-sm leading-relaxed transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                          className: "text-lg font-black text-primary",
                          children: "!",
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                          className: "mt-2 text-card-foreground/85",
                          children: p,
                        }),
                      ],
                    },
                  ),
                },
                p,
              ),
            ),
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
        style: sectionStyle("benefits"),
        "data-section": "luong_thuc_tap",
        className: "bg-muted/60 py-16 sm:py-20",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "mx-auto max-w-6xl px-4",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
              className: "text-2xl font-extrabold sm:text-3xl lg:text-4xl",
              children: content.benefitsHeading,
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
              className: "mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
              children: content.benefits.map((b, i) =>
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  Reveal,
                  {
                    delay: i * 90,
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                      "div",
                      {
                        className:
                          "glass-card h-full rounded-2xl p-6 transition hover:-translate-y-1",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                            className: "text-3xl font-black text-primary",
                            children: b.stat,
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                            className: "mt-3 text-lg font-bold",
                            children: b.title,
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                            className:
                              "mt-2 text-sm leading-relaxed text-muted-foreground",
                            children: b.text,
                          }),
                        ],
                      },
                    ),
                  },
                  b.title,
                ),
              ),
            }),
          ],
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
        style: sectionStyle("majors"),
        "data-section": "nganh_hoc",
        className: "mx-auto max-w-6xl px-4 py-16 sm:py-20",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
            className: "text-2xl font-extrabold sm:text-3xl lg:text-4xl",
            children: content.majorsHeading,
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
            className: "mt-3 max-w-2xl text-muted-foreground",
            children: content.majorsDescription,
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
            className: "mt-9 grid grid-cols-2 gap-4 lg:grid-cols-4",
            children: content.majorNames.map((m, i) =>
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                Reveal,
                {
                  delay: (i % 4) * 80,
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    "div",
                    {
                      className:
                        "h-full rounded-2xl border border-border bg-card p-5 transition duration-300 hover:-translate-y-1.5 hover:border-primary hover:shadow-[var(--shadow-card)]",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                          className: "text-2xl",
                          children: content.majorIcons[i] || "•",
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                          className: "mt-3 text-base font-bold leading-snug",
                          children: m,
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                          className:
                            "mt-2 text-sm leading-relaxed text-muted-foreground",
                          children:
                            content.majorDescriptions[i] || MAJOR_FUTURES[i],
                        }),
                      ],
                    },
                  ),
                },
                m,
              ),
            ),
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
        style: sectionStyle("experts"),
        className: "bg-muted/50 py-16 sm:py-20",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "mx-auto max-w-6xl px-4",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
              className: "text-2xl font-extrabold sm:text-3xl lg:text-4xl",
              children: content.expertsHeading,
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
              className: "mt-3 max-w-2xl text-muted-foreground",
              children: content.expertsDescription,
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
              className: "mt-9 grid gap-5 sm:grid-cols-3",
              children: content.experts.map((e, i) =>
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  Reveal,
                  {
                    delay: i * 90,
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                      "article",
                      {
                        className:
                          "glass-card flex h-full flex-col rounded-2xl p-6",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
                            src: content.expertImageUrls[i] || EXPERTS[i].img,
                            alt: `${e.name} — ${e.role}`,
                            width: 640,
                            height: 640,
                            loading: "lazy",
                            decoding: "async",
                            className:
                              "h-20 w-20 shrink-0 rounded-full object-cover ring-2 ring-border",
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                            className: "mt-4 text-base font-bold leading-snug",
                            children: e.name,
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                            className:
                              "mt-1 text-xs font-semibold text-primary",
                            children: e.role,
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                            className:
                              "mt-4 text-sm leading-relaxed text-card-foreground/85",
                            children: e.bio,
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                            className:
                              "mt-3 border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground",
                            children: e.experience,
                          }),
                        ],
                      },
                    ),
                  },
                  e.name,
                ),
              ),
            }),
          ],
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
        style: sectionStyle("gallery"),
        className: "mx-auto max-w-3xl px-4 py-16 sm:py-20",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
            className: "text-2xl font-extrabold sm:text-3xl lg:text-4xl",
            children: content.galleryHeading,
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
            className: "mt-3 text-muted-foreground",
            children: content.galleryDescription,
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
              className: "mt-8",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                PhotoCarousel,
                { slides: gallerySlides },
              ),
            }),
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
        style: sectionStyle("testimonials"),
        className: "mx-auto max-w-6xl px-4 py-16 sm:py-20",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
            className: "text-2xl font-extrabold sm:text-3xl lg:text-4xl",
            children: content.testimonialsHeading,
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
            className: "mt-9 grid gap-5 lg:grid-cols-3",
            children: content.testimonials.map((t, i) =>
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                Reveal,
                {
                  delay: i * 100,
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    "blockquote",
                    {
                      className:
                        "flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-1",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                          className: "text-gold",
                          "aria-hidden": "true",
                          children: "★★★★★",
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
                          className:
                            "mt-3 flex-1 text-sm leading-relaxed text-card-foreground/90",
                          children: ["“", t.text, "”"],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
                          className: "mt-4 border-t border-border pt-3",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                              className: "text-sm font-bold",
                              children: t.name,
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                              className: "text-xs text-muted-foreground",
                              children: t.meta,
                            }),
                          ],
                        }),
                      ],
                    },
                  ),
                },
                t.name,
              ),
            ),
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
        style: sectionStyle("steps"),
        className: "surface-panel py-16 text-surface-foreground sm:py-20",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "mx-auto max-w-6xl px-4",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
              className: "text-2xl font-extrabold sm:text-3xl lg:text-4xl",
              children: content.stepsHeading,
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
              className: "mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
              children: content.steps.map((s, i) =>
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  Reveal,
                  {
                    delay: i * 90,
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                      "div",
                      {
                        className: "glass-card-dark h-full rounded-2xl p-5",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                            className: "text-2xl font-black text-gold",
                            children: s.number,
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                            className: "mt-2 text-base font-bold",
                            children: s.title,
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                            className:
                              "mt-1.5 text-sm text-surface-foreground/75",
                            children: s.description,
                          }),
                        ],
                      },
                    ),
                  },
                  s.number,
                ),
              ),
            }),
          ],
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
        style: sectionStyle("faq"),
        className: "mx-auto max-w-3xl px-4 py-16 sm:py-20",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
            className:
              "text-center text-2xl font-extrabold sm:text-3xl lg:text-4xl",
            children: content.faqHeading,
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
            className: "mt-8 space-y-3",
            children: faqs.map((f) =>
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "details",
                {
                  onToggle: (e) => {
                    if (e.currentTarget.open) markFaqClick(f.slug);
                  },
                  className:
                    "group rounded-2xl border border-border bg-card p-5 transition hover:border-primary/50",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
                      className:
                        "cursor-pointer list-none text-base font-bold leading-snug marker:hidden",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                          className: "mr-2 text-primary",
                          children: "?",
                        }),
                        f.q,
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                      className:
                        "mt-3 text-sm leading-relaxed text-muted-foreground",
                      children: f.a,
                    }),
                  ],
                },
                f.q,
              ),
            ),
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
        style: sectionStyle("finalCta"),
        className: "bg-muted/60 py-16 sm:py-20",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "mx-auto max-w-3xl px-4",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
              className:
                "text-center text-2xl font-extrabold sm:text-3xl lg:text-4xl",
              children: content.finalCtaHeading,
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
              className: "mt-3 text-center text-muted-foreground",
              children: content.finalCtaDescription,
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "mt-8 space-y-3",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScarcityBar, {}),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadForm, {
                  id: "dang-ky-cuoi",
                }),
              ],
            }),
          ],
        }),
      }),
      homeCustomSections.map((item) =>
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            style: { order: item.order + 1 },
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ContentSection,
              { section: item },
            ),
          },
          item.id,
        ),
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
        style: { order: 99 },
        className: "border-t border-border bg-background py-12",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
            className: "mx-auto mb-10 max-w-6xl px-4",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              FooterStats,
              {},
            ),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "mx-auto max-w-6xl px-4 text-sm text-muted-foreground",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                className: "font-bold text-foreground",
                children: content.brandName,
              }),
              (links.hasHotline || FOOTER.email) &&
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
                  className: "mt-2",
                  children: [
                    links.hasHotline &&
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                        import_jsx_runtime.Fragment,
                        {
                          children: [
                            "Hotline tư vấn:",
                            " ",
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
                              className: "font-semibold text-foreground",
                              href: links.hotlineHref,
                              children: config.floatingContact.hotline,
                            }),
                          ],
                        },
                      ),
                    links.hasHotline && FOOTER.email && " · ",
                    FOOTER.email &&
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                        import_jsx_runtime.Fragment,
                        {
                          children: [
                            "Email:",
                            " ",
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
                              className: "font-semibold text-foreground",
                              href: `mailto:${FOOTER.email}`,
                              children: FOOTER.email,
                            }),
                          ],
                        },
                      ),
                  ],
                }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
                className: "mt-4 text-xs leading-relaxed",
                children: [
                  "Đơn vị bảo trợ chuyên môn & tuyển sinh: ",
                  FOOTER.sponsor,
                  FOOTER.address ? ` — ${FOOTER.address}` : "",
                  FOOTER.licenseNumber
                    ? ` · Giấy phép hoạt động số ${FOOTER.licenseNumber}`
                    : "",
                  ". Chương trình liên kết đào tạo với các trường Cao đẳng nghề và doanh nghiệp tại Trung Quốc.",
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
                className: "mt-4 text-xs",
                children: [
                  "© ",
                  /* @__PURE__ */ new Date().getFullYear(),
                  " Bản quyền thuộc Trung tâm.",
                ],
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecentLeadPopup, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingContact, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyMobileCTA, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: "h-20 sm:hidden",
      }),
    ],
  });
}
//#endregion
export { Landing as component };

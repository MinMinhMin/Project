# Tổng quan dự án
- Bảo viết vào hộ cái

# Thiết lập Camera

## Yêu cầu phần cứng
- 2 webcam:
  - Đối với máy tính để bàn: Cần 2 webcam gắn ngoài.
  - Đối với laptop: 1 webcam tích hợp + 1 webcam gắn ngoài là đủ.

## Nếu không đủ webcam
- Sử dụng điện thoại Android/iOS làm webcam bằng cách thực hiện các bước sau:

### Cài đặt ứng dụng cần thiết
- Trên Android/iOS: Cài đặt *DroidCam* từ Google Play Store/App Store.
- Trên máy tính: Tải và cài đặt *DroidCam Client* từ trang web chính thức: https://www.dev47apps.com/

### Kết nối cả hai thiết bị
- Đảm bảo điện thoại và máy tính được kết nối với cùng một mạng Wi-Fi.
- Mở ứng dụng *DroidCam* trên điện thoại và ghi lại địa chỉ IP (Wi-Fi) được hiển thị.
- Mở *DroidCam Client* trên máy tính, nhập địa chỉ IP (Wi-Fi) và cổng từ điện thoại, sau đó nhấp vào *Start*.

### Kiểm tra kết nối
- Nếu thành công, điện thoại của bạn sẽ hoạt động như một webcam và có thể được sử dụng thay thế cho webcam vật lý.

# Tài khoản kiểm thử

## Quản trị viên
- Tên đăng nhập: admin
- Mật khẩu: 123

## Người dùng
- Tên đăng nhập: minmin
- Mật khẩu: 123

# Thiết lập Docker
- Liên kết kho Docker Hub https://hub.docker.com/u/xyzhuy

- Chạy lệnh các lệnh sau để pull images
```bash
docker pull xyzhuy/frontend
docker pull xyzhuy/backend
docker pull xyzhuy/backend-ai
```

Chạy lệnh sau để khởi động hệ thống
```bash
docker-compose up -d
```

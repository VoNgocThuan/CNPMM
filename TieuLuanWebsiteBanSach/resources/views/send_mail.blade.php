<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Đơn hàng Shop Bán Sách</title>
    <meta http-equiv="Content-Type" content="text/html, charset=utf8">
    <style type="text/css">
        .msg5551881136453116182 .m_5551881136453116182section {
            padding: 30px;
            background: #fff;
            border-bottom: 10px solid #f0f0f0;
        }
        .msg5551881136453116182 .m_5551881136453116182section-content {
            display: inline-block;
            width: 100%;
        }
        .msg5551881136453116182 .m_5551881136453116182product {
            border-bottom: 1px solid #d8d8d8;
            padding-top: 20px;
            padding-bottom: 20px;
            display: inline-block;
            width: 100%;
        }
        .msg5551881136453116182 .m_5551881136453116182section-header--yourPackage {
            background-image: url(https://ci5.googleusercontent.com/proxy/MtS59kqNX0mbRIBTLQHaNLX-cKCe4V5vNSZZ3PxX3rhFNpVRAwxkRxjuJYKUto3Ph3qtyRUskJPVrVtICjjao6VbSZphfUu_rYsx8DQCuptl5VDQLrpdghxlVPkWP7uLcCHAeLt1lDH48jzyBsgfOPgP=s0-d-e1-ft#http://static.cdn.responsys.net/i5/responsysimages/lazada/contentlibrary/!images/ic-package.png);
        }
        .msg5551881136453116182 .m_5551881136453116182section-header {
            background-size: 30px;
            background-repeat: no-repeat;
            height: 30px;
            padding: 5px 0 15px 45px;
            font-size: 18px;
        }
        p {
            display: block;
            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
        }
        table {
            display: table;
            border-collapse: separate;
            box-sizing: border-box;
            text-indent: initial;
            border-spacing: 2px;
            border-color: grey;
        }
        tbody {
            display: table-row-group;
            vertical-align: middle;
            border-color: inherit;
        }
        tr {
            display: table-row;
            vertical-align: inherit;
            border-color: inherit;
        }
        .msg5551881136453116182 a {
            color: #33a2b2!important;
            text-decoration: none;
        }
        .gt a {
            color: #222;
        }
        a:-webkit-any-link {
            color: -webkit-link;
            cursor: pointer;
            text-decoration: underline;
        }
        .msg5551881136453116182 .m_5551881136453116182product-productInfo-name {
            margin-bottom: 7px;
        }
        .msg5551881136453116182 .m_5551881136453116182product-productInfo-name a {
            color: #173948!important;
            font-size: 16px!important;
            text-decoration: none!important;
        }
        .msg5551881136453116182 .m_5551881136453116182product-productInfo-price {
            color: #dd3937;
            font-size: 16px;
        }
        .msg5551881136453116182 .m_5551881136453116182product-productInfo-subInfo {
            color: #585858;
            font-size: 15px;
        }
        
    </style>
</head>

<body>
	<h1>Mail được gửi từ : {{ $name }}</h1>
	<h4>{{ $body }}</h4>
    <p>Xin chào {{ $full_name }},</p>
    <p>Quý khách đã đặt đơn hàng thành công. Đây là chi tiết về đơn hàng - </p>
    <p><strong>Thông tin giao hàng: </strong></p>
    <p>Mã đơn hàng: {{ $ordercode }}<br>
       Họ và tên: {{ $full_name }}<br>
       Địa chỉ giao hàng: {{ $address }}, {{ $wards }}, {{ $province }}, {{ $city }}<br>
       Phí vận chuyển: {{ $feeship }}VNĐ<br>
       Tổng tiền: {{ $total }}VNĐ
    </p>
</div>
    <p>Quý khách sẽ nhận được sản phẩm trong từ 2 đến 3 ngày</p>
    <p>Mọi thắc mắc có thể liên hệ chúng tôi qua số điện thoại: 0843339738</p>
	<p>Cảm ơn quý khách đã mua hàng từ cửa hàng chúng tôi. Hẹn gặp lại quý khách!</p>
</body>
</html>
"use client"
import React from 'react'

function HomePage() {
  return (
//     <div class="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{width: "280px"}}>
//     <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
//       <svg class="bi pe-none me-2" width="40" height="32"></svg>
//       <span class="fs-4">Sidebar</span>
//     </a>
//     <hr/>
//     <ul class="nav nav-pills flex-column mb-auto">
//       <li class="nav-item">
//         <a href="#" class="nav-link active" aria-current="page">
//           <svg class="bi pe-none me-2" width="16" height="16"></svg>
//           Home
//         </a>
//       </li>
//       <li>
//         <a href="#" class="nav-link link-body-emphasis">
//           <svg class="bi pe-none me-2" width="16" height="16"></svg>
//           Dashboard
//         </a>
//       </li>
//       <li>
//         <a href="#" class="nav-link link-body-emphasis">
//           <svg class="bi pe-none me-2" width="16" height="16"></svg>
//           Orders
//         </a>
//       </li>
//       <li>
//         <a href="#" class="nav-link link-body-emphasis">
//           <svg class="bi pe-none me-2" width="16" height="16"></svg>
//           Products
//         </a>
//       </li>
//       <li>
//         <a href="#" class="nav-link link-body-emphasis">
//           <svg class="bi pe-none me-2" width="16" height="16"></svg>
//           Customers
//         </a>
//       </li>
//     </ul>
//     <hr/>
//     <div class="dropdown">
//       <a href="#" class="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
//         <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2"/>
//         <strong>mdo</strong>
//       </a>
//       <ul class="dropdown-menu text-small shadow">
//         <li><a class="dropdown-item" href="#">New project...</a></li>
//         <li><a class="dropdown-item" href="#">Settings</a></li>
//         <li><a class="dropdown-item" href="#">Profile</a></li>
//         <li><hr class="dropdown-divider"/></li>
//         <li><a class="dropdown-item" href="#">Sign out</a></li>
//       </ul>
//     </div>
//   </div>
<div class="container">
  <main>
    <div class="py-5 text-center">
      <img class="d-block mx-auto mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
      <h2>نموذج إتمام الشراء</h2>
      <p class="lead">فيما يلي مثال على نموذج تم إنشاؤه بالكامل باستخدام عناصر تحكم النموذج في Bootstrap. لكل مجموعة نماذج مطلوبة حالة تحقق يمكن تشغيلها بمحاولة إرسال النموذج دون استكماله.</p>
    </div>

    <div class="row g-3">
      <div class="col-md-5 col-lg-4 order-md-last">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-body-secondary">عربة التسوق</span>
          <span class="badge bg-secondary rounded-pill">3</span>
        </h4>
        <ul class="list-group mb-3">
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">اسم المنتج</h6>
              <small class="text-body-secondary">وصف مختصر</small>
            </div>
            <span class="text-body-secondary">$12</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">المنتج الثاني</h6>
              <small class="text-body-secondary">وصف مختصر</small>
            </div>
            <span class="text-body-secondary">$8</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">البند الثالث</h6>
              <small class="text-body-secondary">وصف مختصر</small>
            </div>
            <span class="text-body-secondary">$5</span>
          </li>
          <li class="list-group-item d-flex justify-content-between bg-body-tertiary">
            <div class="text-success">
              <h6 class="my-0">رمز ترويجي</h6>
              <small>EXAMPLECODE</small>
            </div>
            <span class="text-success">-$5</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>مجموع (USD)</span>
            <strong>$20</strong>
          </li>
        </ul>

        <form class="card p-2">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="رمز ترويجي"/>
            <button type="submit" class="btn btn-secondary">تحقق</button>
          </div>
        </form>
      </div>
      <div class="col-md-7 col-lg-8">
        <h4 class="mb-3">عنوان الفوترة</h4>
        <form class="needs-validation" novalidate="">
          <div class="row g-3">
            <div class="col-sm-6">
              <label for="firstName" class="form-label">الاسم الأول</label>
              <input type="text" class="form-control" id="firstName" placeholder="" value="" required=""/>
              <div class="invalid-feedback">
                يرجى إدخال اسم أول صحيح.
              </div>
            </div>

            <div class="col-sm-6">
              <label for="lastName" class="form-label">اسم العائلة</label>
              <input type="text" class="form-control" id="lastName" placeholder="" value="" required=""/>
              <div class="invalid-feedback">
                يرجى إدخال اسم عائلة صحيح.
              </div>
            </div>

            <div class="col-12">
              <label for="username" class="form-label">اسم المستخدم</label>
              <div class="input-group has-validation">
                <span class="input-group-text">@</span>
                <input type="text" class="form-control" id="username" placeholder="اسم المستخدم" required=""/>
              <div class="invalid-feedback">
                اسم المستخدم الخاص بك مطلوب.
                </div>
              </div>
            </div>

            <div class="col-12">
              <label for="email" class="form-label">البريد الإلكتروني <span class="text-body-secondary">(اختياري)</span></label>
              <input type="email" class="form-control" id="email" placeholder="you@example.com"/>
              <div class="invalid-feedback">
                يرجى إدخال عنوان بريد إلكتروني صحيح لتصلكم تحديثات الشحن.
              </div>
            </div>

            <div class="col-12">
              <label for="address" class="form-label">العنوان</label>
              <input type="text" class="form-control" id="address" placeholder="1234 الشارع الأول" required=""/>
              <div class="invalid-feedback">
                يرجى إدخال عنوان الشحن الخاص بك.
              </div>
            </div>

            <div class="col-12">
              <label for="address2" class="form-label">عنوان 2 <span class="text-body-secondary">(اختياري)</span></label>
              <input type="text" class="form-control" id="address2" placeholder="شقة 24"/>
            </div>

            <div class="col-md-5">
              <label for="country" class="form-label">البلد</label>
              <select class="form-select" id="country" required="">
                <option value="">اختر...</option>
                <option>الولايات المتحدة الأمريكية</option>
              </select>
              <div class="invalid-feedback">
                يرجى اختيار بلد صحيح.
              </div>
            </div>

            <div class="col-md-4">
              <label for="state" class="form-label">المنطقة</label>
              <select class="form-select" id="state" required="">
                <option value="">اختر...</option>
                <option>كاليفورنيا</option>
              </select>
              <div class="invalid-feedback">
                يرجى اختيار اسم منطقة صحيح.
              </div>
            </div>

            <div class="col-md-3">
              <label for="zip" class="form-label">الرمز البريدي</label>
              <input type="text" class="form-control" id="zip" placeholder="" required=""/>
              <div class="invalid-feedback">
                الرمز البريدي مطلوب.
              </div>
            </div>
          </div>

          <hr class="my-4"/>

          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="same-address"/>
            <label class="form-check-label" for="same-address">عنوان الشحن هو نفس عنوان الفوترة الخاص بي</label>
          </div>

          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="save-info"/>
            <label class="form-check-label" for="save-info">احفظ هذه المعلومات في المرة القادمة</label>
          </div>

          <hr class="my-4"/>

          <h4 class="mb-3">طريقة الدفع</h4>

          <div class="my-3">
            <div class="form-check">
              <input id="credit" name="paymentMethod" type="radio" class="form-check-input" checked="" required=""/>
              <label class="form-check-label" for="credit">بطاقة ائتمان</label>
            </div>
            <div class="form-check">
              <input id="cash" name="paymentMethod" type="radio" class="form-check-input" required=""/>
              <label class="form-check-label" for="cash">نقد</label>
            </div>
            <div class="form-check">
              <input id="paypal" name="paymentMethod" type="radio" class="form-check-input" required=""/>
              <label class="form-check-label" for="paypal">PayPal</label>
            </div>
          </div>

          <div class="row gy-3">
            <div class="col-md-6">
              <label for="cc-name" class="form-label">الاسم على البطاقة</label>
              <input type="text" class="form-control" id="cc-name" placeholder="" required=""/>
              <small class="text-body-secondary">الاسم الكامل كما هو معروض على البطاقة</small>
              <div class="invalid-feedback">
                الاسم على البطاقة مطلوب
              </div>
            </div>

            <div class="col-md-6">
              <label for="cc-number" class="form-label">رقم البطاقة</label>
              <input type="text" class="form-control" id="cc-number" placeholder="" required=""/>
              <div class="invalid-feedback">
                رقم بطاقة الائتمان مطلوب
              </div>
            </div>

            <div class="col-md-3">
              <label for="cc-expiration" class="form-label">تاريخ انتهاء الصلاحية</label>
              <input type="text" class="form-control" id="cc-expiration" placeholder="" required=""/>
              <div class="invalid-feedback">
                تاريخ انتهاء الصلاحية مطلوب
              </div>
            </div>

            <div class="col-md-3">
              <label for="cc-cvv" class="form-label">الرمز الثلاثي (CVV)</label>
              <input type="text" class="form-control" id="cc-cvv" placeholder="" required=""/>
              <div class="invalid-feedback">
                رمز الحماية مطلوب
              </div>
            </div>
          </div>

          <hr class="my-4"/>

          <button class="w-100 btn btn-primary btn-lg" type="submit">الاستمرار بالدفع</button>
        </form>
      </div>
    </div>
  </main>
  <footer class="my-5 pt-5 text-body-secondary text-center text-small">
    <p class="mb-1">© 2024-2017 اسم الشركة</p>
    <ul class="list-inline">
      <li class="list-inline-item"><a href="#">سياسة الخصوصية</a></li>
      <li class="list-inline-item"><a href="#">اتفاقية الاستخدام</a></li>
      <li class="list-inline-item"><a href="#">الدعم الفني</a></li>
    </ul>
  </footer>
</div>
  )
}

export default HomePage
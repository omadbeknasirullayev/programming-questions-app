# 🖥️ Programming Questions App

**Programming Questions App** - kichik dasturlash tillari bo‘yicha savollar ro‘yxatini jamlash uchun yaratilgan loyiha. Ushbu loyiha orqali dasturchilar turli mavzulardagi savollar bilan ishlashlari va ularni CRUD operatsiyalari (Create, Read, Update, Delete) orqali boshqarishlari mumkin.

---

## 🎯 Loyiha maqsadi

Ushbu loyiha JavaScript yordamida dasturlash bo‘yicha kichik savollar bazasini yaratish uchun ishlab chiqilgan. Loyihani yaratishda asosiy maqsad **JS o‘zida project ko‘tarish** bo‘lgan. 

**Dastlabki reja** hech qanday framework va qo‘shimcha package ishlatmaslik edi.  
Biroq vaqt cheklovlari sababli loyihani tezroq yakunlash maqsadida ba’zi **package** va kutubxonalardan foydalanishga to‘g‘ri keldi. Shunga qaramay, loyiha iloji boricha **minimalistik va soddalashtirilgan** tarzda ishlab chiqilgan.

---

## ✨ Xususiyatlari

✅ Dasturlash bo‘yicha savollarni jamlash  
✅ CRUD (Create, Read, Update, Delete) operatsiyalari  
✅ Soddalashtirilgan kod va minimal package ishlatilgan  
✅ JavaScript asosida ishlaydi  

---

## 🚀 Loyihani ishga tushirish

Loyihani ishga tushirish uchun quyidagi qadamlarni bajaring:

### 1️⃣ Repozitoriyani yuklab olish

```bash

git clone https://github.com/omadbeknasirullayev/programming-questions-app.git
```

### 2️⃣ Packagelarni yuklab olish
``` bash
npm install
```

### 3️⃣ Loyihani run qilish
``` bash
node src/main.js
```

## Postmant collection. Loyihaning postmandagi apilari

```bash

{
	"info": {
		"_postman_id": "6ae79ace-66d5-49bf-a0da-0a28525254e6",
		"name": "programming questions",
		"schema": "https://schema.getpostman.com/json/collection/v2.0.0/collection.json",
		"_exporter_id": "24099990",
		"_collection_link": "https://solar-meteor-815985.postman.co/workspace/My-Workspace~1fb7745d-124c-4636-8a2d-77426906af9e/collection/24099990-6ae79ace-66d5-49bf-a0da-0a28525254e6?action=share&source=collection_link&creator=24099990"
	},
	"item": [
		{
			"name": "Admin",
			"item": [
				{
					"name": "create",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": {
								"token": "{{token}}"
							}
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"fullname\": \"Akmalov Kamron\",\r\n    \"username\": \"Admin@12345\",\r\n    \"password\": \"12345\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "{{base_url}}/admin/create"
					},
					"response": []
				},
				{
					"name": "get all",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": {
								"token": "{{token}}"
							}
						},
						"method": "GET",
						"header": [],
						"url": "{{base_url}}/admin/get-all"
					},
					"response": []
				},
				{
					"name": "get one",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": {
								"token": "{{token}}"
							}
						},
						"method": "GET",
						"header": [],
						"url": "{{base_url}}/admin/get-one/9"
					},
					"response": []
				},
				{
					"name": "remove",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": "{{base_url}}/admin/remove/1"
					},
					"response": []
				}
			]
		},
		{
			"name": "Auth",
			"item": [
				{
					"name": "admin login",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": {
								"token": "{{token}}"
							}
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"username\": \"Admin@123\",\r\n    \"password\": \"12345\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "{{base_url}}/auth/admin-login"
					},
					"response": []
				}
			]
		},
		{
			"name": "Level",
			"item": [
				{
					"name": "create",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": {
								"token": "{{token}}"
							}
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"name\": \"Low\",\r\n    \"position\": 1,\r\n    \"languageId\": 1\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "{{base_url}}/level/create"
					},
					"response": []
				},
				{
					"name": "update",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": {
								"token": "{{token}}"
							}
						},
						"method": "PATCH",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"name\": \"Low\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "{{base_url}}/level/update/1"
					},
					"response": []
				},
				{
					"name": "get all",
					"request": {
						"method": "GET",
						"header": [],
						"url": "{{base_url}}/level/get-all"
					},
					"response": []
				},
				{
					"name": "get one",
					"request": {
						"method": "GET",
						"header": [],
						"url": "{{base_url}}/level/get-one/1"
					},
					"response": []
				},
				{
					"name": "remove",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": "{{base_url}}/level/remove/1"
					},
					"response": []
				}
			]
		},
		{
			"name": "Category",
			"item": [
				{
					"name": "create",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": {
								"token": "{{token}}"
							}
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"name\": \"Function\",\r\n    \"position\": 1,\r\n    \"languageId\": 1,\r\n    \"levelId\": 1\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "{{base_url}}/category/create"
					},
					"response": []
				},
				{
					"name": "update",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": {
								"token": "{{token}}"
							}
						},
						"method": "PATCH",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"name\": \"Low\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "{{base_url}}/category/update/1"
					},
					"response": []
				},
				{
					"name": "get all",
					"request": {
						"method": "GET",
						"header": [],
						"url": "{{base_url}}/category/get-all"
					},
					"response": []
				},
				{
					"name": "get one",
					"request": {
						"method": "GET",
						"header": [],
						"url": "{{base_url}}/category/get-one/1"
					},
					"response": []
				},
				{
					"name": "remove",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": "{{base_url}}/category/remove/1"
					},
					"response": []
				}
			]
		},
		{
			"name": "Question",
			"item": [
				{
					"name": "create",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": {
								"token": "{{token}}"
							}
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"name\": \"Function turlari haqida nimalarni bilasiz?\",\r\n    \"position\": 1,\r\n    \"languageId\": 1,\r\n    \"levelId\": 1,\r\n    \"categoryId\": 1\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "{{base_url}}/question/create"
					},
					"response": []
				},
				{
					"name": "update",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": {
								"token": "{{token}}"
							}
						},
						"method": "PATCH",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"name\": \"Low\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "{{base_url}}/question/update/1"
					},
					"response": []
				},
				{
					"name": "get all",
					"request": {
						"method": "GET",
						"header": [],
						"url": "{{base_url}}/question/get-all"
					},
					"response": []
				},
				{
					"name": "get one",
					"request": {
						"method": "GET",
						"header": [],
						"url": "{{base_url}}/question/get-one/1"
					},
					"response": []
				},
				{
					"name": "remove",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": "{{base_url}}/question/remove/1"
					},
					"response": []
				}
			]
		}
	]
}

from app.db.base import Base
from app.db.session import SessionLocal, engine
from app.modules.catalog.models import Accessory, Category, Console, Game
from sqlalchemy.orm import Session

def seed_database(db: Session) -> dict[str, int]:
    print("Starting local catalog seeding...")

    # 2.main categories data
    categories_data = [
        {"name": "Action", "slug": "action"},
        {"name": "RPG", "slug": "rpg"},
        {"name": "Strategy", "slug": "strategy"},
        {"name": "Sports", "slug": "sports"},
        {"name": "Racing", "slug": "racing"},
        {"name": "Horror", "slug": "horror"},
        {"name": "Adventure", "slug": "adventure"}
    ]

    categories = {
        category.slug: category
        for category in db.query(Category).all()
    }
    new_categories = []
    for cat_info in categories_data:
        category = categories.get(cat_info["slug"])
        if category is None:
            category = Category(**cat_info)
            db.add(category)
            categories[cat_info["slug"]] = category
            new_categories.append(category)
    db.flush()

    #  Data : (title, category_name, price, rating, is_featured, image_url)
    games_data = [
        # --- Action ---
        ("God of War 2018", "Action", 39.99, 4.9, True, "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg"),
        ("Devil May Cry 5", "Action", 29.99, 4.8, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/601150/header.jpg"),
        ("Assassin's Creed Valhalla", "Action", 49.99, 4.3, True, "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/header.jpg"),
        ("Spider-Man Remastered", "Action", 49.99, 4.8, True, "https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/header.jpg"),
        ("Batman: Arkham Knight", "Action", 19.99, 4.7, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/208650/header.jpg"),
        ("Shadow of the Tomb Raider", "Action", 29.99, 4.5, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/750920/header.jpg"),
        ("Sekiro: Shadows Die Twice", "Action", 59.99, 4.9, True, "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header.jpg"),
        ("Ghost of Tsushima", "Action", 49.99, 4.9, True, "https://cdn.cloudflare.steamstatic.com/steam/apps/2215430/header.jpg"),

        # --- RPG ---
        ("Cyberpunk 2077", "RPG", 29.99, 4.5, True, "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg"),
        ("The Witcher 3: Wild Hunt", "RPG", 39.99, 5.0, True, "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg"),
        ("Elden Ring", "RPG", 59.99, 4.9, True, "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg"),
        ("Baldur's Gate 3", "RPG", 59.99, 4.9, True, "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg"),
        ("Skyrim Special Edition", "RPG", 19.99, 4.7, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/489830/header.jpg"),
        ("Dark Souls III", "RPG", 39.99, 4.8, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/374320/header.jpg"),
        ("Horizon Zero Dawn", "RPG", 29.99, 4.6, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/1151640/header.jpg"),
        ("Monster Hunter: World", "RPG", 29.99, 4.7, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/582010/header.jpg"),

        # --- Strategy ---
        ("Civilization VI", "Strategy", 19.99, 4.7, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/289070/header.jpg"),
        ("Age of Empires IV", "Strategy", 39.99, 4.6, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/1066890/header.jpg"),
        ("Total War: Warhammer III", "Strategy", 49.99, 4.5, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/1142710/header.jpg"),
        ("Stellaris", "Strategy", 39.99, 4.4, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/281990/header.jpg"),
        ("XCOM 2", "Strategy", 24.99, 4.6, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/268500/header.jpg"),
        ("Crusader Kings III", "Strategy", 49.99, 4.7, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/1158310/header.jpg"),

        # --- Sports ---
        ("EA Sports FC 24", "Sports", 59.99, 4.0, True, "https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/header.jpg"),
        ("NBA 2K24", "Sports", 49.99, 3.8, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/2338770/header.jpg"),
        ("Madden NFL 24", "Sports", 49.99, 3.9, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/2140330/header.jpg"),
        ("WWE 2K23", "Sports", 39.99, 4.2, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/1942660/header.jpg"),
        ("PGA Tour", "Sports", 39.99, 4.1, False, "https://images.unsplash.com/photo-1535131749006-b7f58c99034b"),

        # --- Racing ---
        ("Forza Horizon 5", "Racing", 49.99, 4.8, True, "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg"),
        ("Need for Speed Unbound", "Racing", 39.99, 4.2, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/1846250/header.jpg"),
        ("Gran Turismo 7", "Racing", 59.99, 4.7, False, "https://images.unsplash.com/photo-1511919884226-fd3cad34687c"),
        ("F1 23", "Racing", 49.99, 4.5, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/2108330/header.jpg"),
        ("Dirt Rally 2.0", "Racing", 19.99, 4.6, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/690790/header.jpg"),
        ("Assetto Corsa Competizione", "Racing", 29.99, 4.7, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/805550/header.jpg"),

        # --- Horror ---
        ("Resident Evil 4 Remake", "Horror", 49.99, 4.9, True, "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg"),
        ("Dead Space Remake", "Horror", 39.99, 4.8, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/1693980/header.jpg"),
        ("Silent Hill 2 Remake", "Horror", 59.99, 4.7, True, "https://cdn.cloudflare.steamstatic.com/steam/apps/2124490/header.jpg"),
        ("The Last of Us Part I", "Horror", 49.99, 4.8, True, "https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/header.jpg"),
        ("Outlast", "Horror", 14.99, 4.5, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/238320/header.jpg"),
        ("Amnesia: The Bunker", "Horror", 24.99, 4.4, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/1944430/header.jpg"),

        # --- Adventure ---
        ("Red Dead Redemption 2", "Adventure", 49.99, 5.0, True, "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg"),
        ("Uncharted 4: A Thief's End", "Adventure", 39.99, 4.8, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/1659420/header.jpg"),
        ("Grand Theft Auto V", "Adventure", 29.99, 4.7, True, "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg"),
        ("It Takes Two", "Adventure", 39.99, 4.9, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/1426210/header.jpg"),
        ("Hollow Knight", "Adventure", 14.99, 4.9, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg"),
        ("Minecraft", "Adventure", 29.99, 4.8, True, "https://images.unsplash.com/photo-1627856013091-fed6e4e302e2"),
        ("Terraria", "Adventure", 9.99, 4.7, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/105600/header.jpg"),
        ("Portal 2", "Adventure", 9.99, 4.9, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/620/header.jpg"),
        ("Subnautica", "Adventure", 29.99, 4.8, False, "https://cdn.cloudflare.steamstatic.com/steam/apps/264710/header.jpg"),
        ("God of War Ragnarok", "Adventure", 59.99, 4.9, True, "https://cdn.cloudflare.steamstatic.com/steam/apps/2322010/header.jpg")
    ]

    existing_game_slugs = {
        slug for (slug,) in db.query(Game.slug).all()
    }
    new_games = []
    for title, cat_name, price, rating, is_featured, image_url in games_data:
        slug = title.lower().replace(":", "").replace("'", "").replace(" ", "-")
        if slug in existing_game_slugs:
            continue
        new_games.append(
            Game(
                title=title,
                slug=slug,
                description=f"Experience the ultimate adventure in {title}. An incredible title in the {cat_name} category.",
                price=price,
                rating=rating,
                image_url=image_url,
                category_id=categories[cat_name.lower()].id,
                is_featured=is_featured,
            )
        )
        existing_game_slugs.add(slug)

    db.add_all(new_games)
    console_data = [
        {
            "title": "PlayStation 5 Slim",
            "slug": "playstation-5-slim",
            "description": "نسخة PlayStation 5 Slim مع أداء ألعاب الجيل الحالي ومساحة تخزين 1 تيرابايت.",
            "price": 499.99,
            "rating": 4.9,
            "image_url": "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=85",
            "manufacturer": "Sony",
            "platform": "PlayStation",
            "storage": "1 TB SSD",
            "is_handheld": False,
            "is_featured": True,
        },
        {
            "title": "Xbox Series X 1TB",
            "slug": "xbox-series-x-1tb",
            "description": "جهاز Xbox Series X للألعاب بدقة 4K مع مساحة تخزين داخلية 1 تيرابايت.",
            "price": 449.99,
            "rating": 4.8,
            "image_url": "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=1200&q=85",
            "manufacturer": "Microsoft",
            "platform": "Xbox",
            "storage": "1 TB SSD",
            "is_handheld": False,
            "is_featured": True,
        },
        {
            "title": "Nintendo Switch OLED",
            "slug": "nintendo-switch-oled",
            "description": "جهاز Nintendo Switch بشاشة OLED مقاس 7 بوصات للعب المنزلي والمحمول.",
            "price": 349.99,
            "rating": 4.8,
            "image_url": "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=1200&q=85",
            "manufacturer": "Nintendo",
            "platform": "Nintendo",
            "storage": "64 GB",
            "is_handheld": True,
            "is_featured": True,
        },
        {
            "title": "Steam Deck OLED 512GB",
            "slug": "steam-deck-oled-512gb",
            "description": "جهاز Steam Deck OLED محمول للعب مكتبة Steam مع شاشة HDR ومساحة 512 جيجابايت.",
            "price": 549.99,
            "rating": 4.7,
            "image_url": "https://images.unsplash.com/photo-1640955014216-75201056c829?auto=format&fit=crop&w=1200&q=85",
            "manufacturer": "Valve",
            "platform": "PC Handheld",
            "storage": "512 GB",
            "is_handheld": True,
            "is_featured": False,
        },
    ]
    existing_console_slugs = {
        slug for (slug,) in db.query(Console.slug).all()
    }
    new_consoles = [
        Console(**item)
        for item in console_data
        if item["slug"] not in existing_console_slugs
    ]
    db.add_all(new_consoles)

    accessory_data = [
        {
            "title": "DualSense Wireless Controller",
            "slug": "dualsense-wireless-controller",
            "description": "يد تحكم لاسلكية بخصائص اللمس التفاعلي والمشغلات التكيفية لأجهزة PlayStation 5.",
            "price": 69.99,
            "rating": 4.8,
            "image_url": "https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=1200&q=85",
            "brand": "Sony",
            "category": "Controllers",
            "compatibility": "PlayStation 5, PC",
            "is_featured": True,
        },
        {
            "title": "Xbox Wireless Controller",
            "slug": "xbox-wireless-controller",
            "description": "يد تحكم Xbox لاسلكية بتصميم مريح واتصال Bluetooth للألعاب على الجهاز والحاسوب.",
            "price": 64.99,
            "rating": 4.7,
            "image_url": "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=1200&q=85",
            "brand": "Microsoft",
            "category": "Controllers",
            "compatibility": "Xbox, PC, Android",
            "is_featured": False,
        },
        {
            "title": "Wireless Gaming Headset",
            "slug": "wireless-gaming-headset",
            "description": "سماعة ألعاب لاسلكية بصوت محيطي وميكروفون قابل للفصل ووسائد مريحة.",
            "price": 129.99,
            "rating": 4.6,
            "image_url": "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=1200&q=85",
            "brand": "HyperX",
            "category": "Headsets",
            "compatibility": "PlayStation, Xbox, PC",
            "is_featured": True,
        },
        {
            "title": "Mechanical Gaming Keyboard",
            "slug": "mechanical-gaming-keyboard",
            "description": "لوحة مفاتيح ميكانيكية بإضاءة RGB ومفاتيح سريعة قابلة للتخصيص.",
            "price": 99.99,
            "rating": 4.7,
            "image_url": "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=85",
            "brand": "Keychron",
            "category": "Keyboards",
            "compatibility": "PC, Mac",
            "is_featured": False,
        },
        {
            "title": "Precision Gaming Mouse",
            "slug": "precision-gaming-mouse",
            "description": "فأرة ألعاب خفيفة بحساس دقيق وأزرار قابلة للبرمجة.",
            "price": 79.99,
            "rating": 4.6,
            "image_url": "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=85",
            "brand": "Logitech",
            "category": "Mice",
            "compatibility": "PC, Mac",
            "is_featured": False,
        },
        {
            "title": "Portable Console Dock",
            "slug": "portable-console-dock",
            "description": "قاعدة توصيل صغيرة لشحن الأجهزة المحمولة وربطها بشاشة خارجية.",
            "price": 49.99,
            "rating": 4.4,
            "image_url": "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=1200&q=85",
            "brand": "UGREEN",
            "category": "Docks & Cables",
            "compatibility": "Nintendo Switch, USB-C handhelds",
            "is_featured": False,
        },
    ]
    existing_accessory_slugs = {
        slug for (slug,) in db.query(Accessory.slug).all()
    }
    new_accessories = [
        Accessory(**item)
        for item in accessory_data
        if item["slug"] not in existing_accessory_slugs
    ]
    db.add_all(new_accessories)

    result = {
        "categories_added": len(new_categories),
        "games_added": len(new_games),
        "consoles_added": len(new_consoles),
        "accessories_added": len(new_accessories),
    }
    print(
        f"Added {result['categories_added']} categories and "
        f"{result['games_added']} games, {result['consoles_added']} consoles, "
        f"and {result['accessories_added']} accessories."
    )
    return result

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        seed_database(db)
        db.commit()
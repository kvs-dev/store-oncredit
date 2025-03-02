import { CreateProductDto } from '../models/product.model';

export abstract class ProductCreator {
  abstract createProduct(data: CreateProductDto): any;
}

export class ElectronicsProductCreator extends ProductCreator {
  createProduct(data: CreateProductDto): any {
    console.log('Creating Electronics product');
    return {
      title: data.title,
      price: data.price,
      description: data.description || 'Electronics product',
      category: {
        id: data.categoryId,
        name: 'Electronics'
      },
      image: data.image || 'https://picsum.photos/200'
    };
  }
}

export class ClothingProductCreator extends ProductCreator {
  createProduct(data: CreateProductDto): any {
    console.log('Creating Clothing product');
    return {
      title: data.title,
      price: data.price,
      description: data.description || 'Clothing product',
      category: {
        id: data.categoryId,
        name: 'Clothing'
      },
      image: data.image || 'https://picsum.photos/200'
    };
  }
}

export class FoodProductCreator extends ProductCreator {
  createProduct(data: CreateProductDto): any {
    console.log('Creating Food product');
    return {
      title: data.title,
      price: data.price,
      description: data.description || 'Food product',
      category: {
        id: data.categoryId,
        name: 'Food'
      },
      image: data.image || 'https://picsum.photos/200'
    };
  }
}

export class BooksProductCreator extends ProductCreator {
  createProduct(data: CreateProductDto): any {
    console.log('Creating Book product');
    return {
      title: data.title,
      price: data.price,
      description: data.description || 'Book product',
      category: {
        id: data.categoryId,
        name: 'Books'
      },
      image: data.image || 'https://picsum.photos/200'
    };
  }
}

export class DefaultProductCreator extends ProductCreator {
  createProduct(data: CreateProductDto): any {
    console.log('Creating Default product');
    return {
      title: data.title,
      price: data.price,
      description: data.description || 'Product',
      category: {
        id: data.categoryId,
        name: 'Others'
      },
      image: data.image || 'https://picsum.photos/200'
    };
  }
}


export class ProductFactory {
  createProduct(data: CreateProductDto): any {
    let creator: ProductCreator;

    switch (data.categoryId) {
      case 1:
        creator = new ElectronicsProductCreator();
        break;
      case 2:
        creator = new ClothingProductCreator();
        break;
      case 3:
        creator = new FoodProductCreator();
        break;
      case 4:
        creator = new BooksProductCreator();
        break;
      default:
        creator = new DefaultProductCreator();
    }

    return creator.createProduct(data);
  }
} 
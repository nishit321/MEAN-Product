import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import { getErrorResponse, getResponse } from "../../src/config/response";
import CategoryModel from "../../src/model/Category.Model";
import ProductModel from "../../src/model/Products.Model";
import { IProduct } from "../interface/Products.interface";
import { User } from "../model/User";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { ProductRepository } from "../repositories/ProductRepository";
import { Message, MessageCodes } from "../shared/message-codes/message-codes";

export default class ProductController {
  public getProducts = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const user: User = request["user"];
      const item = { userId: user.userId };
      const productRepository = new ProductRepository(ProductModel);
      const res = getResponse(
        httpStatus.OK,
        await productRepository.getProducts(JSON.stringify(item))
      );
      return response.status(res.status).send(res);
    } catch (error) {
      const res = getErrorResponse(
        httpStatus.INTERNAL_SERVER_ERROR,
        MessageCodes.UnexpectedError,
        Message.UnexpectedError,
        error
      );
      return response.status(res.status).send(res);
    }
  };

  public getProductById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const productRepository = new ProductRepository(ProductModel);
      const res = getResponse(
        httpStatus.OK,
        await productRepository.getProductById(request.params.id)
      );
      return response.status(res.status).send(res);
    } catch (error) {
      const res = getErrorResponse(
        httpStatus.INTERNAL_SERVER_ERROR,
        MessageCodes.UnexpectedError,
        Message.UnexpectedError,
        error
      );
      return response.status(res.status).send(res);
    }
  };

  public addProduct = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const user: User = request["user"];
      const product: IProduct = request.body;

      product.userId = user.userId;
      const productRepository = new ProductRepository(ProductModel);
      product.category = await this.updateCategory(product);

      const res = getResponse(
        httpStatus.OK,
        await productRepository.create(product),
        MessageCodes.Product_Create,
        Message.Product_Create
      );
      return response.status(res.status).send(res);
    } catch (error) {
      const res = getErrorResponse(
        httpStatus.INTERNAL_SERVER_ERROR,
        MessageCodes.UnexpectedError,
        Message.UnexpectedError,
        error
      );
      return response.status(res.status).send(res);
    }
  };

  public deleteProduct = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const productRepository = new ProductRepository(ProductModel);
      const res = getResponse(
        httpStatus.OK,
        await productRepository.findByIdAndDelete(request.params.id),
        MessageCodes.Product_Delete,
        Message.Product_Delete
      );
      return response.status(res.status).send(res);
    } catch (error) {
      const res = getErrorResponse(
        httpStatus.INTERNAL_SERVER_ERROR,
        MessageCodes.UnexpectedError,
        Message.UnexpectedError,
        error
      );
      return response.status(res.status).send(res);
    }
  };

  public updateProduct = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const product: IProduct = request.body;
      const productRepository = new ProductRepository(ProductModel);
      product.category = await this.updateCategory(product);
      const res = getResponse(
        httpStatus.OK,
        await productRepository.findByIdAndUpdate(
          product.id,
          product,
          JSON.stringify({ returnOriginal: false })
        ),
        MessageCodes.Product_Update,
        Message.Product_Update
      );
      return response.status(res.status).send(res);
    } catch (error) {
      const res = getErrorResponse(
        httpStatus.INTERNAL_SERVER_ERROR,
        MessageCodes.UnexpectedError,
        Message.UnexpectedError,
        error
      );
      return response.status(res.status).send(res);
    }
  };

  async updateCategory(product: IProduct): Promise<string> {
    const categoryCondition: any = {
      $set: { name: product.category },
    };
    const category = {
      name: product.category,
    };
    const categoryRepository = new CategoryRepository(CategoryModel);
    const categoryDetails = await categoryRepository.insertUnique(
      category,
      categoryCondition,
      JSON.stringify({ upsert: true, returnOriginal: false })
    );
    return categoryDetails._id;
  }
}

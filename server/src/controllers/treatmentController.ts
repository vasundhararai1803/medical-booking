import { Request, Response, NextFunction } from 'express';
import { Treatment } from '../models/Treatment';
import { AppError } from '../utils/AppError';

export const getTreatments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { category } = req.query;

    const query: Record<string, unknown> = { isActive: true };

    if (category) {
      query.category = category as string;
    }

    const treatments = await Treatment.find(query);

    res.status(200).json({
      status: 'success',
      results: treatments.length,
      data: {
        treatments,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getTreatmentBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const treatment = await Treatment.findOne({ slug: req.params.slug, isActive: true });

    if (!treatment) {
      return next(new AppError('No treatment found with that slug', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        treatment,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createTreatment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newTreatment = await Treatment.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        treatment: newTreatment,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateTreatment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedTreatment = await Treatment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTreatment) {
      return next(new AppError('No treatment found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        treatment: updatedTreatment,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTreatment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Soft delete by setting isActive to false
    const treatment = await Treatment.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!treatment) {
      return next(new AppError('No treatment found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

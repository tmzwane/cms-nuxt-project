// Load Locale Model
import Locale from "../models/Locale.js";

export async function addNewLocale(payload) {
  const errors = { success: false };

  try {
    const locale = await Locale.findOne({ title: payload.title });

    if (locale) {
      errors.message = "Locale with the same title already exists";
      errors.status_code = 400;
      return errors;
    }

    const toAdd = new Locale({
      title: payload.title,
      description: payload.description,
      summary: payload.summary,
      seo_title: payload.seo_title,
      seo_description: payload.seo_description,
      seo_summary: payload.seo_summary,
      use_seo_values: payload.use_seo_values,
    });

    const newLocale = await toAdd.save();

    return {
      success: true,
      data: newLocale,
      message: "Locale added",
      status_code: 201,
    };
  } catch (errorDetails) {
    errors.message = "Request failed";
    errors.details = errorDetails;
    errors.status_code = 500;
    return errors;
  }
}

export async function updateLocale(localeId, payload) {
  const errors = { success: false };

  try {
    const locale = await Locale.findById(localeId);

    if (!locale) {
      errors.message = "Locale doesn't exist";
      errors.status_code = 404;
      return errors;
    }

    const toUpdate = {};
    toUpdate.title = payload.title || locale.title;
    toUpdate.description = payload.description || locale.description;
    toUpdate.summary = payload.summary || locale.summary;
    toUpdate.seo_title = payload.seo_title || locale.seo_title;
    toUpdate.seo_description =
      payload.seo_description || locale.seo_description;
    toUpdate.seo_summary = payload.seo_summary || locale.seo_summary;
    toUpdate.use_seo_values = payload.use_seo_values || locale.use_seo_values;

    const updatedLocale = await Locale.findByIdAndUpdate(localeId, toUpdate);

    return {
      success: true,
      data: updatedLocale,
      message: "Locale updated",
      status_code: 200,
    };
  } catch (errorDetails) {
    errors.message = "Request failed";
    errors.details = errorDetails;
    errors.status_code = 500;
    return errors;
  }
}

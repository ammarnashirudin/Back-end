
import { Router } from "express";
import { 
    findPeakSeasonRateController,
    updatePeakSeasonRateController,
    deletePeakSeasonRateController,
    createPeakSeasonController,
    deletePeakSeasonByDateController,
    getPeakSeasonController
} from "@/controllers/peakSeasonRate.controllers";

const peakSeasonRateRouter = Router();

peakSeasonRateRouter.get("/room/:roomId", findPeakSeasonRateController);
peakSeasonRateRouter.put("/:id",updatePeakSeasonRateController);
peakSeasonRateRouter.delete("/:id", deletePeakSeasonRateController);
peakSeasonRateRouter.post("/", createPeakSeasonController);
peakSeasonRateRouter.delete("/",deletePeakSeasonByDateController);
peakSeasonRateRouter.get("/room/:roomId", getPeakSeasonController);
export default peakSeasonRateRouter;
import request from "supertest";
// import supertest request object

import { Response } from "supertest";
// import supertest Response type

import app from "../src/app";
// import express application and server

import { calculatePortfolioPerformance } from "../src/portfolio/portfolioPerformance";

describe("calculatePortfolioPerformance", () => {
    it("should calculate excellent portfolio performance", () => {
        // Arrange
        const initialInvestment = 10000;
        const currentValue = 16000;

        // Act
        const result = calculatePortfolioPerformance(
            initialInvestment,
            currentValue
        );

        // Assert
        expect(result.profitOrLoss).toBe(6000);
        expect(result.percentageChange).toBe(60);
        expect(result.performanceSummary).toBe(
            "Excellent performance! Your investments are doing great."
        );
    });

    it("should identify no change in portfolio performance", () => {
        // Arrange
        const initialInvestment = 10000;
        const currentValue = 10000;

        // Act
        const result = calculatePortfolioPerformance(
            initialInvestment,
            currentValue
        );

        // Assert
        expect(result.profitOrLoss).toBe(0);
        expect(result.percentageChange).toBe(0);
        expect(result.performanceSummary).toBe(
            "No change. Your portfolio is holding steady."
        );
    });

    it("should calculate minor portfolio losses", () => {
        // Arrange
        const initialInvestment = 10000;
        const currentValue = 9000;

        // Act
        const result = calculatePortfolioPerformance(
            initialInvestment,
            currentValue
        );

        // Assert
        expect(result.profitOrLoss).toBe(-1000);
        expect(result.percentageChange).toBe(-10);
        expect(result.performanceSummary).toBe(
            "Minor loss. Stay calm and review your options."
        );
    });
});

// API tests

describe("GET /api/v1/health", () => {
    it("should return server health status", async () => {
        // create GET request to health endpoint
        const response: Response = await request(app).get("/api/v1/health");

        // assert response status OK and health object to have specified properties
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("OK");
        expect(response.body).toHaveProperty("uptime");
        expect(response.body).toHaveProperty("timestamp");
        expect(response.body).toHaveProperty("version");
    });
});

describe("GET /api/v1/portfolio/performance", () => {
    it("should return portfolio performance", async () => {
        // Arrange
        const initialInvestment = 10000;
        const currentValue = 16000;

        // Act
        const response: Response = await request(app).get(
            `/api/v1/portfolio/performance?initialInvestment=${initialInvestment}&currentValue=${currentValue}`
        );

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.initialInvestment).toBe(10000);
        expect(response.body.currentValue).toBe(16000);
        expect(response.body.profitOrLoss).toBe(6000);
        expect(response.body.percentageChange).toBe(60);
        expect(response.body.performanceSummary).toBe(
            "Excellent performance! Your investments are doing great."
        );
    });
});
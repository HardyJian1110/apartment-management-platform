package com.sky.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(description = "Dashboard Energy VO")
public class DashboardEnergyVO implements Serializable {

    @ApiModelProperty("name")
    private String name;

    @ApiModelProperty("data")
    private List<BigDecimal> data;

}

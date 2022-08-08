package com.pmp4.websocketchat.chat.model;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ChattDAO {
    List<ChattVO> selectChatt();
}
